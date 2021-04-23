-- CreateTable
CREATE TABLE `Hotel` (
    `hotelId` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `address` VARCHAR(191),
UNIQUE INDEX `Hotel.name_unique`(`name`),

    PRIMARY KEY (`hotelId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Room` (
    `roomId` INTEGER NOT NULL AUTO_INCREMENT,
    `type` VARCHAR(191) NOT NULL,
    `amount` INTEGER NOT NULL,
    `reserve` INTEGER NOT NULL,
    `pricePerNight` DOUBLE NOT NULL,
    `hotelId` INTEGER,

    PRIMARY KEY (`roomId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Booking` (
    `bookingId` INTEGER NOT NULL AUTO_INCREMENT,
    `arrival` DATETIME(3) NOT NULL,
    `checkout` DATETIME(3) NOT NULL,
    `roomNumber` DATETIME(3) NOT NULL,
    `userId` INTEGER NOT NULL,
    `breakfast` BOOLEAN NOT NULL,
    `nights` INTEGER NOT NULL,
    `commment` VARCHAR(191) NOT NULL,
    `bookTime` VARCHAR(191) NOT NULL,
    `bookingPaymentType` ENUM('ONLINE', 'ONSITE') NOT NULL,
    `roomId` INTEGER NOT NULL,

    PRIMARY KEY (`bookingId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `User` (
    `userId` INTEGER NOT NULL AUTO_INCREMENT,
    `email` VARCHAR(191) NOT NULL,
    `password` VARCHAR(191) NOT NULL,
    `first_name` VARCHAR(191) NOT NULL,
    `last_name` VARCHAR(191) NOT NULL,
    `role` ENUM('USER', 'ADMIN') NOT NULL DEFAULT 'USER',
    `phoneNumber` VARCHAR(191) NOT NULL,
    `userStatus` ENUM('UNAUTORIZED', 'AVAILABLE', 'UNAVAILABLE') NOT NULL,
    `note` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`userId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Room` ADD FOREIGN KEY (`hotelId`) REFERENCES `Hotel`(`hotelId`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Booking` ADD FOREIGN KEY (`userId`) REFERENCES `User`(`userId`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Booking` ADD FOREIGN KEY (`roomId`) REFERENCES `Room`(`roomId`) ON DELETE CASCADE ON UPDATE CASCADE;
