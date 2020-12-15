document.addEventListener('ActivateGentlemanMode', function (options) {     //Adds an eventlistener which activates this file
    console.log("Successfully loaded gentlemanmode");                       //when ActivateGentlemanMode event is sent.
});


import { Lexer } from '../modules/jspos/lexer.js'           //Import the two modules needed to analyze the text
import { POSTagger } from '../modules/jspos/POSTagger.js'


const badwords = ["4r5e", "5h1t", "5hit", "a55", "anal", "anus", "ar5e", "arrse", "arse", "ass", "ass-fucker", "asses", "assfucker", "assfukka", "asshole", "assholes", "asswhole", "a_s_s", "b!tch", "b00bs", "b17ch", "b1tch", "ballbag", "balls", "ballsack", "bastard", "beastial", "beastiality", "bellend", "bestial", "bestiality", "bi+ch", "biatch", "bitch", "bitcher", "bitchers", "bitches", "bitchin", "bitching", "bloody", "blow job", "blowjob", "blowjobs", "boiolas", "bollock", "bollok", "boner", "boob", "boobs", "booobs", "boooobs", "booooobs", "booooooobs", "breasts", "buceta", "bugger", "bum", "bunny fucker", "butt", "butthole", "buttmuch", "buttplug", "c0ck", "c0cksucker", "carpet muncher", "cawk", "chink", "cipa", "cl1t", "clit", "clitoris", "clits", "cnut", "cock", "cock-sucker", "cockface", "cockhead", "cockmunch", "cockmuncher", "cocks", "cocksuck", "cocksucked", "cocksucker", "cocksucking", "cocksucks", "cocksuka", "cocksukka", "cok", "cokmuncher", "coksucka", "coon", "cox", "crap", "cum", "cummer", "cumming", "cums", "cumshot", "cunilingus", "cunillingus", "cunnilingus", "cunt", "cuntlick", "cuntlicker", "cuntlicking", "cunts", "cyalis", "cyberfuc", "cyberfuck", "cyberfucked", "cyberfucker", "cyberfuckers", "cyberfucking", "d1ck", "damn", "dick", "dickhead", "dildo", "dildos", "dink", "dinks", "dirsa", "dlck", "dog-fucker", "doggin", "dogging", "donkeyribber", "doosh", "duche", "dyke", "ejaculate", "ejaculated", "ejaculates", "ejaculating", "ejaculatings", "ejaculation", "ejakulate", "f u c k", "f u c k e r", "f4nny", "fag", "fagging", "faggitt", "faggot", "faggs", "fagot", "fagots", "fags", "fanny", "fannyflaps", "fannyfucker", "fanyy", "fatass", "fcuk", "fcuker", "fcuking", "feck", "fecker", "felching", "fellate", "fellatio", "fingerfuck", "fingerfucked", "fingerfucker", "fingerfuckers", "fingerfucking", "fingerfucks", "fistfuck", "fistfucked", "fistfucker", "fistfuckers", "fistfucking", "fistfuckings", "fistfucks", "flange", "fook", "fooker", "fuck", "fucka", "fucked", "fucker", "fuckers", "fuckhead", "fuckheads", "fuckin", "fucking", "fuckings", "fuckingshitmotherfucker", "fuckme", "fucks", "fuckwhit", "fuckwit", "fudge packer", "fudgepacker", "fuk", "fuker", "fukker", "fukkin", "fuks", "fukwhit", "fukwit", "fux", "fux0r", "f_u_c_k", "gangbang", "gangbanged", "gangbangs", "gaylord", "gaysex", "goatse", "God", "god-dam", "god-damned", "goddamn", "goddamned", "hardcoresex", "hell", "heshe", "hoar", "hoare", "hoer", "homo", "hore", "horniest", "horny", "hotsex", "jack-off", "jackoff", "jap", "jerk-off", "jism", "jiz", "jizm", "jizz", "kawk", "knob", "knobead", "knobed", "knobend", "knobhead", "knobjocky", "knobjokey", "kock", "kondum", "kondums", "kum", "kummer", "kumming", "kums", "kunilingus", "l3i+ch", "l3itch", "labia", "lust", "lusting", "m0f0", "m0fo", "m45terbate", "ma5terb8", "ma5terbate", "masochist", "master-bate", "masterb8", "masterbat*", "masterbat3", "masterbate", "masterbation", "masterbations", "masturbate", "mo-fo", "mof0", "mofo", "mothafuck", "mothafucka", "mothafuckas", "mothafuckaz", "mothafucked", "mothafucker", "mothafuckers", "mothafuckin", "mothafucking", "mothafuckings", "mothafucks", "mother fucker", "motherfuck", "motherfucked", "motherfucker", "motherfuckers", "motherfuckin", "motherfucking", "motherfuckings", "motherfuckka", "motherfucks", "muff", "mutha", "muthafecker", "muthafuckker", "muther", "mutherfucker", "n1gga", "n1gger", "nazi", "nigg3r", "nigg4h", "nigga", "niggah", "niggas", "niggaz", "nigger", "niggers", "nob", "nob jokey", "nobhead", "nobjocky", "nobjokey", "numbnuts", "nutsack", "orgasim", "orgasims", "orgasm", "orgasms", "p0rn", "pawn", "pecker", "penis", "penisfucker", "phonesex", "phuck", "phuk", "phuked", "phuking", "phukked", "phukking", "phuks", "phuq", "pigfucker", "pimpis", "piss", "pissed", "pisser", "pissers", "pisses", "pissflaps", "pissin", "pissing", "pissoff", "poop", "porn", "porno", "pornography", "pornos", "prick", "pricks", "pron", "pube", "pusse", "pussi", "pussies", "pussy", "pussys", "rectum", "retard", "rimjaw", "rimming", "s hit", "s.o.b.", "sadist", "schlong", "screwing", "scroat", "scrote", "scrotum", "semen", "sex", "sh!+", "sh!t", "sh1t", "shag", "shagger", "shaggin", "shagging", "shemale", "shi+", "shit", "shitdick", "shite", "shited", "shitey", "shitfuck", "shitfull", "shithead", "shiting", "shitings", "shits", "shitted", "shitter", "shitters", "shitting", "shittings", "shitty", "skank", "slut", "sluts", "smegma", "smut", "snatch", "son-of-a-bitch", "spac", "spunk", "s_h_i_t", "t1tt1e5", "t1tties", "teets", "teez", "testical", "testicle", "tit", "titfuck", "tits", "titt", "tittie5", "tittiefucker", "titties", "tittyfuck", "tittywank", "titwank", "tosser", "turd", "tw4t", "twat", "twathead", "twatty", "twunt", "twunter", "v14gra", "v1gra", "vagina", "viagra", "vulva", "w00se", "wang", "wank", "wanker", "wanky", "whoar", "whore", "willies", "willy", "xrated", "xxx"]
const badwords2 = ["aberrant", "amateur", "animal", "anorak", "ape", "ape covered in human flesh", "apefucker", "arfarfan'arf", "arse", "arsebreath", "arsecunt", "arseface", "arsehole", "arse-licker", "ass", "assaholic", "assbutt", "ass clown", "asscunt", "assface", "assfag", "assfaggot", "assfucker", "asshat", "asshole", "ass-kisser", "assmonkey", "assmouth", "assmunch", "ass-nugget", "ass sucker", "asstard", "asswagon", "assweed", "asswipe", "aunt fucker", "baby", "backwoodsman", "badass", "badgerfucker", "bag of dicks", "ballkicker", "ballsack", "bandit", "bangsat", "barbarian", "Barbie-fucker", "bastard", "bean head", "beast", "beetlehead", "beginner", "beldame", "bell-end", "berk", "bespawler", "bimbo", "birdbrain", "birdfucker", "bitch", "bitchass", "bitch ass motherfucker", "bitch boy", "bitchcunt", "bitchface", "bitchfucker", "bitchtits", "bitchwad", "bitchwhore", "bitchzilla", "biznatch", "blackguard", "blaggard", "blockhead", "blubber gut", "bluntie", "bogeyman", "bokuto kinnie", "bonehead", "boob", "booby", "boomer", "bootlicker", "boozer", "boyfucker", "bozo", "brickfucker", "brickhead", "brotherfucker", "buffoon", "bugfucker", "bugger", "bullfuck", "bum", "bumbo", "bum chum", "bum-fucker", "burden", "buttass", "buttbreath", "buttfucker", "butthead", "butthole", "buttkisser", "buttlicker", "buttmunch", "butt sniffer", "camelfucker", "catfucker", "caveman", "chauvinist", "chav", "cheater", "chicken", "chickenfucker", "child", "childfucker", "chode", "chump", "churl", "clithead", "clown", "cock", "cockalorum", "cockboy", "cockburger", "cockfucker", "cockhead", "cockholster", "cockmaster", "cockroach", "cocksucker", "cockwaddle", "cockweasel", "cockwomble", "coffee slurper", "con man", "con merchant", "coomer", "corpsefucker", "cougar", "country bumpkin", "cousinfucker", "cow", "coward", "cowfucker", "crackhead", "crack whore", "craphole", "creep", "cretin", "cro magnon", "crook", "cuckold", "cumbucket", "cum dumpster", "cum guzzler", "cum-licker", "cumslut", "cumstain", "cunt", "cuntass", "cuntbiscuit", "cuntbitch", "cuntbreath", "cuntface", "cunt fart", "cuntfucker", "cuntlicker", "cunt muncher", "cunt rag", "cuntshit", "cuntsucker", "cuntzilla", "dandiprat", "daughterfucker", "deadhead", "degenerate", "der-brain", "desperado", "devil", "dick", "dickass", "dickbag", "dickbreath", "dickcheese", "dickface", "dickfucker", "dickhead", "dickhole", "dickless", "dicklicker", "dick man", "dick mouth", "dick sniffer", "dicksplash", "dick-sucker", "dicktard", "dickwad", "dickweasel", "dick weed", "dildo", "dillhole", "dimmadumbass", "dimwit", "ding-head", "dingleberry", "dinosaur", "dipfuck", "dirtbag", "dirthead", "dirtwad", "dodo", "dog", "dogbolt", "dogbreath", "dogfucker", "dolt", "donkey", "donkey dick", "donkeyfucker", "doofus", "dope", "dotterel", "douche", "douche bag", "doucheburger", "douche canoe", "douchefag", "douchelord", "douche nozzle", "douchewad", "douchewagon", "dracula", "dreamer", "drunkard", "duckfucker", "dumbarse", "dumbass", "dumbbell", "dumb fucker", "dumbo", "dummy", "dunce", "duncebucket", "dweebling", "earthworm", "edgelord", "egghead", "egotist", "envirotard", "eunuch", "fag", "faggot", "faggotface", "fagtard", "fagtits", "farmer", "fart", "fartface", "fatass", "fatfuck", "fat geezer", "fatherfucker", "fatso", "fat-tard", "fatty", "fellow", "fetus", "fibber", "filth", "fink", "fish", "fishwife", "fixer", "flake", "fool", "freak", "fruitcake", "fuck", "fuckass", "fuckbait", "fuckbucket", "fucker", "fuckface", "fuckhead", "fucking bitch", "fucklord", "fuck noggin", "fucknose", "fuck nugget", "fuckrod", "fuckskull", "fuckstain", "fuckster", "fucktard", "fucktoy", "fuckweasel", "fuckwhistle", "fuckwit", "fugly", "gawk", "gaytard", "geebag", "gimp", "git", "gobshite", "gold digger", "goof", "goon", "goose", "gorilla", "grandmotherfucker", "greeniac", "grouch", "grumpy", "handfucker", "headass", "helldog", "hikikomori", "hilding", "hillbilly", "hippie", "ho", "hobbledehoy", "hoe", "hog", "homo", "hooligan", "hooplehead", "horsefucker", "horse's ass", "horse's necktie", "hosebag", "hussy", "hypocrite", "idiot", "idiotist", "idiot sandwich", "ignoramus", "imbecile", "inbred", "incel", "intercourser", "jabroni", "jackass", "jackhole", "jackwagon", "jagweed", "jamoke", "jefferson", "jelly", "jerk", "jerkoff", "jerkwad", "jit stain", "jizz guzzler", "joker", "junkie", "karen", "kevun", "keyboard warrior", "kidfucker", "klutz", "lamebrain", "landwhale", "langer", "lard face", "liar", "libtard", "lickspittle", "lobotomite", "loser", "louse", "low-life", "lunatic", "lunkhead", "lurdane", "lush", "mackerel", "madman", "maggot", "Ma?l", "mamzer", "maxy waxy", "meanie", "megabitch", "megadouche", "milksop", "minx", "missing link", "Mong", "mongoose", "monkey", "monkeyface", "monster", "mooncalf", "moron", "motherfucker", "mousefucker", "mouth breather", "Mr. Anger", "Mr. Obsessed", "Mr. Struggle", "Mr. Talk", "mucky pup", "mumpsimus", "muppet", "mutant", "mutt", "neanderthal", "neckbeard", "necrophiliac", "ne'er-do-well", "nephew fucker", "nerd", "nerf herder", "niece fucker", "nimrod", "nincompoop", "ninny", "ninnyhammer", "nitwit", "nobody", "non", "nonce", "noob", "noodle", "numbnuts", "numbskull", "numpty", "numskull", "oaf", "oddball", "ogre", "oompa loompa", "orphan", "outlaw", "oxygen thief", "pack", "pain in the ass", "pariah", "peasant", "pedo", "pedophile", "penchod", "pencil dick", "penis face", "penis sucker", "pervert", "pig", "pigfucker", "piggy-wiggy", "pikspiller", "pillock", "pinhead", "pirate", "pissbrain", "pissbreath", "pissface", "pleb", "plonker",
    "pooface", "poohead", "porno freak", "prick", "prickface", "pseudo-intellectual", "pube flosser", "pudwhacker", "puke bag", "pukeball", "puppet", "pussyboy", "pussyfucker", "pussy pisser", "quack", "quat", "queer", "queer bait", "querulant", "raasclaat", "rabbitfucker", "rat", "ratcatcher", "ratfink", "ratfucker", "redneck", "reject", "retard", "riff-raff", "roaster", "robot", "rowdy", "rudesby", "ruffian", "runt", "sadist", "Sam Rea", "saprophyte", "sausage-masseuse", "scobberlotcher", "scoundrel", "scumbag", "scumbreath", "scumbutt", "scumface", "scumfuck", "scumhead", "scumlord", "scumwad", "scuzzbag", "serf", "sewer rat", "shark", "sheepfucker", "sheepshagger", "shill", "shitass", "shitbag", "shitball", "shitbird", "shitbrain", "shitbreath", "shitbucket", "shitbum", "shitcunt", "shitdick", "shit-eater", "shitehawk", "shitface", "shit-for-brains", "shitfuck", "shitfucker", "shitgoblin", "shithead", "shitizen", "shitlord", "shitneck", "shitnugget", "shitpicker", "shitpiss", "shitpot", "shitpuddle", "shitsack", "shit stain", "shitter", "shitweasel", "shmekl", "shrew", "shyster", "sibling fucker", "simp", "simpleton", "sisterfucker", "sister humper", "skank", "sket", "skite", "skullfucker", "skunk", "skunkfucker", "slag", "slave", "sleazewad", "sleeze", "sleeze bag", "slimeface", "slob", "slut", "slutfucker", "sluthead", "smell-feast", "smellfungus", "snail", "snake", "snob", "snollygoster", "snot", "snotball", "snotface", "snothead", "snotwad", "snowflake", "son of a bitch", "son of a motherless goat", "son of a whore", "sow", "spack", "sped", "sphincter", "splenetic", "square", "stink cunt", "stinker", "stinkhole", "straggot", "stupid", "swindler", "swine", "sycophant", "thief", "thundercunt", "titbag", "toad", "tool", "tree hugger", "troglodyte", "troll", "trollface", "trolltard", "turd", "turdball", "turdbucket", "turdpile", "twat", "twattock", "twatwaffle", "twerp", "twit", "twunt", "unclefucker", "vagina cleaner", "vampire", "vandal", "vantz", "varmint", "vermin", "vonce", "wacko", "wallflower", "wanker", "wank stain", "weeze bag", "weirdo", "whore", "whorefucker", "whore's-bird", "whoreson", "windfucker", "windsucker", "wino", "witch", "womanizer", "wommy", "worm", "wretch", "xenophobe", "yahoo", "yes-man", "yiffer", "yonker", "yutz", "zitface", "zoophile", "zounderkite"]
//The list of swears that should be replaced.


const VB = ['let', 'see', 'eat', 'play', 'move', 'cast', 'chose'];           //The list of words we intend to use as replacement
const VBD = ['ate', 'flowered', 'powered', 'cost', 'did', 'fell'];          //(see modules/jspos/README.md for categories descriptions)
const VBG = ['playing', 'teaching', 'forgetting', 'forgot', 'paid'];
const VBN = ['eaten', 'built', 'cut', 'quit', 'run', 'shaken', 'spread'];
const VBP = ['let', 'see', 'eat', 'play', 'move', 'cast', 'chose'];
const VBZ = ['eats', 'does', 'plays', 'pushs', 'moves', 'tells', 'wakes'];
const NN = ['beautiful person', 'fish', 'table', 'sheep', 'chips', 'water', 'flower', 'gentleman'];
const NNS = ['dogs', 'gentlemen', 'feminists', 'cows', ' bottles', 'mouses', 'beds'];
const NNP = ['London', 'Smith', 'Paris', 'James'];
const NNPS = ['Smiths', 'Jones', 'Browns'];
const JJ = ['good', 'fast', 'late', 'happy', 'young', 'smart', 'brave', 'noble', 'wise',];
const FW = ['rendez-vous', 'café', 'faux pas', 'persona non grata', 'adieu', 'baguette'];
const JJR = ['better', 'faster', 'happier', 'younger', 'smarter', 'braver', 'nobler', 'wiser', 'taller', 'farther'];
const JJS = ['best', 'fastest', 'latest', 'happiest', 'youngest', 'smartest', 'bravest', 'noblest', 'wisest', 'dearest'];


let dict = {                            //Matching the code of a part of speech with the dictionnary containing 
    "VB": VB,                           //the remplacement words of this type
    "VBD": VBD,
    "VBG": VBG,
    "VBN": VBN,
    "VBP": VBP,
    "VBZ": VBZ,
    "NN": NN,
    "NNS": NNS,
    "NNP": NNP,
    "NNPS": NNPS,
    "JJ": JJ,
    "FW": FW,
    "JJR": JJR,
    "JJS": JJS,
}


function getWordsType(node) {                               //Gets the type of the words included in a node.
    try {                                                   //Expected to receive a text node as argument
        var words = new Lexer().lex(node.data);             //Return pattern : [[word1,pos1],[word2,pos2],...]
        var taggedwords = new POSTagger().tag(words);
        return taggedwords
    } catch { }
}


function mustBeReplaced(word) {                             //Determines if a word needs to be replaced <=> if the word belongs to the
    return (badwords.includes(word.toLowerCase()) || badwords2.includes(word.toLowerCase()))      //forbidden lists
}


function getRandomInt(max) {                                //Gives a random int strictly lower than max parameter.
    return Math.floor(Math.random() * Math.floor(max));     //max = 0 is not allowed. 0 can be returned
}


function replaceWords(node) {                               //Recursive function replacing swear words by random words in our lists.
    if (node.nodeType == 3) {                               //This function works separetely in each node. This fuction keeps the part
        let taggedwords = getWordsType(node);               //of speech of each replaced word intact
        for (i in taggedwords) {
            let word = taggedwords[i][0];
            let pos = taggedwords[i][1];
            if (mustBeReplaced(word)) {
                const possible_words = dict[pos];
                const n = possible_words.length;
                let new_word = possible_words[getRandomInt(n)];
                node.data = node.data.replace(word, new_word);
            }
        }
    }
    if (node.nodeType == 1 && node.nodeName != "SCRIPT") {    //if the node doesn't contain text, iterate the function on his children
        for (var i = 0; i < node.childNodes.length; i++) {
            replaceWords(node.childNodes[i]);
        }
    }
}
replaceWords(document.body);                                //Automatically calls replaceWords on the document body