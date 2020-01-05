-- MySQL dump 10.13  Distrib 5.7.27, for Linux (x86_64)
--
-- Host: localhost    Database: soulMate
-- ------------------------------------------------------
-- Server version	5.7.27-0ubuntu0.18.04.1

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `filters`
--

DROP TABLE IF EXISTS `filters`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `filters` (
  `userId` int(11) NOT NULL,
  `city` varchar(32) COLLATE utf8mb4_unicode_ci NOT NULL,
  `state` varchar(2) COLLATE utf8mb4_unicode_ci NOT NULL,
  `ethnicity` varchar(32) COLLATE utf8mb4_unicode_ci NOT NULL,
  `religion` varchar(32) COLLATE utf8mb4_unicode_ci NOT NULL,
  `ageMin` int(11) NOT NULL,
  `ageMax` int(11) NOT NULL,
  `heightMinFeet` varchar(2) COLLATE utf8mb4_unicode_ci NOT NULL,
  `heightMinInch` varchar(2) COLLATE utf8mb4_unicode_ci NOT NULL,
  `heightMaxFeet` varchar(2) COLLATE utf8mb4_unicode_ci NOT NULL,
  `heightMaxInch` varchar(2) COLLATE utf8mb4_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `filters`
--

LOCK TABLES `filters` WRITE;
/*!40000 ALTER TABLE `filters` DISABLE KEYS */;
INSERT INTO `filters` VALUES (2,'','','','',17,51,'','','',''),(4,'','','','',17,51,'','','',''),(25,'','','','',25,28,'','','','');
/*!40000 ALTER TABLE `filters` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `likes`
--

DROP TABLE IF EXISTS `likes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `likes` (
  `idFrom` int(11) NOT NULL,
  `idTo` int(11) NOT NULL,
  `isLike` tinyint(1) NOT NULL,
  `createdAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `likes`
--

LOCK TABLES `likes` WRITE;
/*!40000 ALTER TABLE `likes` DISABLE KEYS */;
INSERT INTO `likes` VALUES (3,1,1,'2019-12-16 21:59:07'),(4,1,1,'2019-12-16 21:59:27'),(5,1,1,'2019-12-16 21:59:35'),(10,1,1,'2019-12-16 21:59:50'),(11,1,1,'2019-12-16 22:00:19'),(22,1,1,'2019-12-16 22:00:33'),(1,10,1,'2019-12-16 22:06:17');
/*!40000 ALTER TABLE `likes` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `messages`
--

DROP TABLE IF EXISTS `messages`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `messages` (
  `messageId` int(11) NOT NULL AUTO_INCREMENT,
  `idFrom` int(11) NOT NULL,
  `idTo` int(11) NOT NULL,
  `message` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `createdAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`messageId`)
) ENGINE=InnoDB AUTO_INCREMENT=34 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `messages`
--

LOCK TABLES `messages` WRITE;
/*!40000 ALTER TABLE `messages` DISABLE KEYS */;
INSERT INTO `messages` VALUES (1,2,4,'hellolo, sarah~~~','2019-12-02 05:16:38'),(2,4,2,'Hi, Jeff, what are you doing? Looking sneaky~~','2019-12-11 18:26:02'),(3,2,4,'Oh, I just wanted to.....say hi to you, I miss you~~~','2019-12-11 18:26:17'),(4,4,2,'Oh, really? I missed you too, do you wanna go beach this weekend?','2019-12-02 05:22:39'),(5,2,4,'Ahaha, of course~!','2019-12-02 05:23:04'),(6,2,4,'You are cute!','2019-12-02 19:05:14'),(7,4,2,'Thank you, I think you are cute too.','2019-12-02 19:05:45'),(8,2,4,'Where do you live?','2019-12-02 19:06:11'),(9,4,2,'Inside your dream','2019-12-02 19:06:33'),(10,2,4,'Please dont wake me up.','2019-12-02 19:06:49'),(11,2,4,'I am hungry','2019-12-02 20:31:13'),(12,2,4,'Do you want to eat?','2019-12-02 20:31:53'),(13,2,4,'hun?','2019-12-02 20:34:45'),(14,2,4,'hun?','2019-12-02 20:35:19'),(15,2,4,'I will talk to you later','2019-12-11 18:26:55'),(16,2,4,'????','2019-12-11 18:27:02'),(17,2,4,'not working','2019-12-02 21:08:00'),(18,2,4,'Hope it is working!!!','2019-12-02 21:17:16'),(19,2,4,'tricky way','2019-12-02 21:30:04'),(20,2,4,'another try','2019-12-02 22:53:22'),(21,2,4,'?','2019-12-02 22:54:15'),(22,2,4,'....','2019-12-02 22:55:52'),(23,2,4,'hi Vandana','2019-12-02 23:50:21'),(24,4,2,'I was just going to shower, who is Vandana?','2019-12-11 18:25:51'),(25,4,2,'......','2019-12-03 00:11:09'),(26,9,3,'Hello, Irene~~~','2019-12-04 02:28:39'),(27,3,9,'Hello, Michael~~~','2019-12-04 02:29:14'),(28,2,4,'Hi, Jake','2019-12-04 23:08:51'),(29,2,3,'kjdlsfs','2019-12-10 01:53:23'),(30,1,10,'Hello\n','2019-12-11 00:01:06'),(31,2,11,'hello','2019-12-11 05:51:18'),(32,2,11,'The Gettysburg Address is a speech that U.S. President Abraham Lincoln delivered during the American Civil War at the dedication of the Soldiers\' National Cemetery in Gettysburg, Pennsylvania, on the afternoon of Thursday, November 19, 1863, four and a half months after the Union armies defeated those of the Confederacy at the Battle of Gettysburg. It is one of the best-known speeches in American history.[4][5]\n\nNot even the day\'s primary speech, Lincoln\'s carefully crafted address came to be seen as one of the greatest and most influential statements of American national purpose. In just 271 words, beginning with the now iconic phrase \"Four score and seven years ago,\"‍ referring to the signing of the Declaration of Independence[6] 87 years earlier, Lincoln described the US as a nation \"conceived in Liberty, and dedicated to the proposition that all men are created equal,\" and represented the Civil War as a test that would determine whether such a nation, the Union sundered by the secession crisis,[7] could endure. He extolled the sacrifices of those who died at Gettysburg in defense of those principles, and exhorted his listeners to resolve\n\nthat these dead shall not have died in vain—that this nation, under God, shall have a new birth of freedom[8]—and that government of the people, by the people, for the people, shall not perish from the earth.[6][9]\nDespite the prominent place of the speech in the history and popular culture of the United States, its exact wording is disputed. The five known manuscripts of the Gettysburg Address in Lincoln\'s hand differ in a number of details, and also differ from contemporary newspaper reprints of the speech. Neither is it clear where stood the platform from which Lincoln delivered the address. Modern scholarship locates the speakers\' platform 40 yards (or more) away from the traditional site in Soldiers\' National Cemetery at the Soldiers\' National Monument, such that it stood entirely within the private, adjacent Evergreen Cemetery.','2019-12-12 23:46:48'),(33,10,1,'Hi, Nice to meet you~','2020-01-04 01:15:56');
/*!40000 ALTER TABLE `messages` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `moments`
--

DROP TABLE IF EXISTS `moments`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `moments` (
  `momentId` int(11) NOT NULL AUTO_INCREMENT,
  `userId` int(11) NOT NULL,
  `message` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `likes` int(11) NOT NULL,
  `picture` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `createdAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`momentId`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `moments`
--

LOCK TABLES `moments` WRITE;
/*!40000 ALTER TABLE `moments` DISABLE KEYS */;
INSERT INTO `moments` VALUES (1,1,'My cat is cute~~~',0,'images/cat.png','2019-12-05 21:43:48'),(2,4,'You want it?',0,'images/food.JPG','2019-12-05 21:48:17'),(3,2,'My cat looks like me, ahaha!',0,'images/funnycat.jpg','2019-12-05 22:20:51'),(4,1,'Anyone like my new ragdoll? ^_^',0,'images/ragdoll.png','2019-12-05 22:21:37'),(5,3,'I went to this sick club in Vegas and had so much fun in the backstage~',0,'images/1576197260.jpg','2019-12-13 00:34:54'),(6,10,'I just moved into this new home! Isn\'t it lovely?',0,'images/1576198698.jpg','2019-12-13 00:58:36');
/*!40000 ALTER TABLE `moments` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `users` (
  `userId` int(11) NOT NULL AUTO_INCREMENT,
  `email` varchar(32) COLLATE utf8mb4_unicode_ci NOT NULL,
  `password` varchar(32) COLLATE utf8mb4_unicode_ci NOT NULL,
  `images` varchar(64) COLLATE utf8mb4_unicode_ci NOT NULL,
  `firstName` varchar(32) COLLATE utf8mb4_unicode_ci NOT NULL,
  `lastName` varchar(32) COLLATE utf8mb4_unicode_ci NOT NULL,
  `gender` varchar(8) COLLATE utf8mb4_unicode_ci NOT NULL,
  `location` varchar(128) COLLATE utf8mb4_unicode_ci NOT NULL,
  `age` int(11) NOT NULL,
  `height` varchar(32) COLLATE utf8mb4_unicode_ci NOT NULL,
  `jobTitle` varchar(64) COLLATE utf8mb4_unicode_ci NOT NULL,
  `ethnicity` varchar(64) COLLATE utf8mb4_unicode_ci NOT NULL,
  `religion` varchar(64) COLLATE utf8mb4_unicode_ci NOT NULL,
  `iLike` varchar(512) COLLATE utf8mb4_unicode_ci NOT NULL,
  `iAm` varchar(512) COLLATE utf8mb4_unicode_ci NOT NULL,
  `iAppreciate` varchar(512) COLLATE utf8mb4_unicode_ci NOT NULL,
  `createdAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`userId`)
) ENGINE=InnoDB AUTO_INCREMENT=26 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'wenhao@soulmate.com','pass','/images/Wenhao.png','Wenhao','Wang','Male','Hacienda Heights, CA',31,'5\'11\"','Software Engineer','Asian','None','I like to walk under the water.','I am an easy going guy.','I appreciate my other half loving cat as I do.','2020-01-04 01:12:13'),(2,'jeff@soulmate.com','novahaha','/images/Jeff.jpg','Jeff','Lee','Male','Irvine, CA',28,'5\'11\"','Jr. Web Dev','Asian','Christian','Women that play tennis in cute tennis clothes.','Man that plays tennis in cute tennis clothes.','Women that are open-minded & say what\'s on their minds.','2019-12-12 23:35:50'),(3,'Irene@soulmate.com','novahaha','/images/Irene.jpg','Irene','Kim','Female',' Los Angeles, CA',25,'5\'0\"','Singer','Asian','Christian','Men who are amazing singers & dress well','A simple girl who likes simple things','When a guy opens doors for me.','2019-12-12 23:35:50'),(4,'sarah@soulmate.com','novahaha','/images/Sarah.png','Sarah','Park','Female','Irvine, CA',24,'5\'2\"','Actress','Asian','Christian','Men that play amazing tennis in cute tennis clothes.','a girl who plays decent tennis in very cute tennis clothes.','Guys who are funny & easy going.','2019-12-12 23:35:50'),(5,'jennifer@soulmate.com','novahaha','/images/Jennifer.jpg','Jennifer','Park','Female','Santa Ana, CA',22,'5\'5\"','Screenwriter','Asian','Buddhist','to watch movies in my cozy couch.','a screenwriter who appreciates all forms of art.','guys with sense of taste & appreciation of the arts.','2019-12-12 23:35:50'),(6,'frodo@soulmate.com','novahaha','/images/Frodo.png','Frodo','Baggins','Male','Shire, ME',25,'4\'2\"','Ring Bearer','Latino','Muslim','shiny golden jewelry like rings!','a short but brave hobbit who loves adventures!','Tall women who do not take my jewelry away from me.','2019-12-12 23:35:50'),(7,'legolas@soulmate.com','novahaha','/images/Legolas.jpg','Legolas','Greenleaf','Male','Northern Mirkwood, ME',31,'5\'11\"','King of Woodland Realm','Middle Eastern','Hindu','to shoot arrows, travel with dwarfs, and enter random wars for fun!','a master archer who is looking for a beautiful queen.','women who are not gold-diggers - I am a king & rich!','2019-12-12 23:35:50'),(8,'alex@soulmate.com','novahaha','/images/Alex.png','Alex','Hassler','Male','Laguna, CA',22,'5\'10\"','Surfer','Caucasian','Catholic','I like to sing.','A caring person.','If mydate is friendly.','2019-12-12 23:35:50'),(9,'michael@soulmate.com','novahaha','/images/Michael.png','Michael','Chang','Male','Irvine, CA',29,'5\'11\"','Potato farmer','Asian','None','Women that like oranges','a couch potato','women that sleep more than 6 hours','2019-12-12 23:35:50'),(10,'jackie@soulmate.com','novahaha','/images/Jackie.png','Jackie','Evancho','Female','San Diego, CA',26,'5\'7\"','Teacher','Caucasian','Christian','Men that sleep before 12:00','a person that loves oversleeping ','Men that can run faster than me','2019-12-13 01:04:45'),(11,'taylor@soulmate.com','novahaha','/images/Taylor.png','Taylor','Swift','Female','Los Angeles, CA',25,'6\'2\"','Singer','Caucasian','Muslim','To dump boys because they are the ones with probems.','a perfect girl that any guy should be grateful to date.','Handsome guys with lots and lots of money.','2019-12-12 23:35:50'),(12,'vivian@soulmate.com','novahaha','/images/Vivian.png','Vivian','Uzair','Female','Lakeforest, CA',35,'4\'10\"','Cashier at Whole Foods','Asian','Hindu','a desperate girl who really needs a boyfriend','a tired girl just sick of coming home alone all the time.','If you are a boy - I am sick of meeting girls pretending to be men.','2019-12-13 01:05:05'),(13,'Jacob@soulmate.com','novahaha','/images/Jacob.jpg','Jacob','Hassler','Male','St Louis, MO',22,'5\'11\"','Smoke Specialist','Caucasian','Muslim','Fight with Zyaad for fun','a nice guy who wants to meet pretty grills.','Hot girls with lots and lots of money.','2019-12-12 23:35:50'),(14,'Haney@soulmate.com','novahaha','/images/Haney.jpg','Christian','Haney','Male','Irvine, CA',22,'6\'8\"','Professional Actor','Caucasian','Muslim','a girl who will watch me code on my computer and get turned on.','that perfect man looking for my perfect woman.','A girl who goes crazy for acting & tall men.','2019-12-12 23:35:50'),(15,'Pzo@soulmate.com','novahaha','/images/Pzo.jpg','Christian','Pzo','Male','Irvine, CA',22,'5\'7\"','The Next Frodo','Caucasian','Hindu','To sit in my tiny room with a golden ring and pretend I am enchanted by it.','A woman who understands that sometimes, a man has got to get a ring on his finger.','Women that buy me lots of golden rings & does not mind that I call them master as I refer to myself in the 3rd person perspective.','2019-12-13 01:08:23'),(16,'Khoa@soulmate.com','novahaha','/images/Khoa.jpg','Khoa','Cao','Male','Irvine, CA',27,'5\'7\"','Jujitsu Master','Asian','Catholic','to do playfight with my future girlfriend that turns into a romantic actual kung fu showdown until someone passes out.','A powerful woman able to take my massive punches to their stomaches.','A woman who is not afraid to slap me, beat me, punch me just for sh*ts and giggles and does not mind it when I do it right back.','2019-12-13 01:05:42'),(17,'Tomas@soulmate.com','novahaha','/images/Tomas.jpg','Tomas','Cormons','Male','Irvine, CA',28,'6\'4\"','Professional Hockey Player','Latino','Hindu','to do kinky things with a hockey puck & my hockey sticks hehe','one of those bad boys that all girls find super attractive.  Watch me hit that hockey puck with my hockey stick baby.','A girl who knows that ins and outs of hockey & is not afraid to get loud and nasty at local kids hockey league games.','2019-12-13 01:06:04'),(18,'Alexia@soulmate.com','novahaha','/images/Yeji.jpeg','Alexia','Ken','Female','Irvine, CA',34,'5\'2\"','Teacher','Asian','Catholic','To find a man who can run ten miles in under one hour.','a positive generic girl that has a love for pumpkin spiced lattes.','Guys who have a mustache.','2019-12-13 01:06:22'),(19,'Alice@soulmate.com','novahaha','/images/Jenny.jpg','Alice','Pon','Female','Corona Del Mar, CA',21,'5\'4\"','Student','Asian','Muslim','To find a man who can run ten miles in under one hour.','a positive generic girl that has a love for pumpkin spiced lattes.','Guys who have a love for cats.','2019-12-13 03:29:09'),(20,'Jo@soulmate.com','novahaha','/images/Scarlette.jpg','Jo','Mamo','Female','Arcadia, CA',26,'5\'5\"','Grad Student','Caucasian','Christian','To find a man who appreciates modern art as much as I do','a quadrilingual, and  three time world champion of badminton ','Someone who can help bring my badminton skills to the next level.','2019-12-13 01:06:57'),(21,'Miya@soulmate.com','novahaha','/images/Christine.jpg','Miya','Poltergeist','Female','Irvine, CA',24,'5\'8\"','Forensic Investigator','Latino','None','To find the truth of the universe and to find someone to aide me search for my daughter, Annabelle','quiet, calm, person that enjoys going to places where most people won’t. ','Someone who can see ghosts','2019-12-13 01:07:15'),(22,'Isabella@soulmate.com','novahaha','/images/Isabella.jpg','Isabella','Lopez','Female','Long Beach, CA',27,'5\'9\"','Aircraft Pilot','Latino','Christian',' flying. It’s the best feeling in the world.','someone who enjoys playing with my flying simulator at home when not flying in my job.','a guy who can appreciate an independent, spontaneous and smart woman ','2019-12-12 23:35:50'),(23,'Lucy@soulmate.com','novahaha','/images/Lucy.jpg','Lucy','Alfred','Female','Walnut, CA',23,'4\'11\"','Wedding Coordinator','Black','None','To go on long road trips and eat delicious looking foods','an outgoing girl that likes to plan everything in advance.','Guys who can take the heat and handle a feisty Carolina Reaper pepper .','2019-12-12 23:35:50'),(24,'Heo@soulmate.com','novahaha','/images/Heo.png','Alex','Heo','Male','Irvine, CA',39,'5\'10\"','Sith Lord','Asian','Hindu','women who like music, is a foodie, and wants to conquer the known universe.','a Sith Lord; \'nuff said.','women who appreciate strong men who wants to rule the universe, and don\'t like sand, because sand is coarse and rough and irritating, and it gets everywhere.','2019-12-12 23:35:50');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2020-01-04  1:16:29
