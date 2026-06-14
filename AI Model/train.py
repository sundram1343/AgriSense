import tensorflow as tf
IMG_SIZE = (224, 224)
BATCH_SIZE = 32
train_ds=tf.keras.utils.image_dataset_from_directory(
    'dataset',
    validation_split=0.2,
    subset='training',
    seed=42,
    image_size=IMG_SIZE,
    batch_size=BATCH_SIZE    
)
val_ds=tf.keras.utils.image_dataset_from_directory(
    'dataset',
    validation_split=0.2,
    subset='validation',
    seed=42,
    image_size=IMG_SIZE,
    batch_size=BATCH_SIZE
)
class_names=train_ds.class_names
base_model=tf.keras.applications.MobileNetV2(
    input_shape=(224,224,3),
    include_top=False,
    weights='imagenet'
)
base_model.trainable=False
model=tf.keras.Sequential([
    base_model,
    tf.keras.layers.GlobalAveragePooling2D(),
    tf.keras.layers.Dense(128,activation='relu'),
    tf.keras.layers.Dropout(0.3),
    tf.keras.layers.Dense(len(class_names),activation='softmax')
])
model.compile(
    optimizer='adam',
    loss='sparse_categorical_crossentropy',
    metrics=['accuracy']
)
model.fit(
    train_ds,
    validation_data=val_ds,
    epochs=10
)
model.save("plant_disease_model.h5")
with open("classes.txt","w") as f:
    for c in class_names:
        f.write(c+"\n")