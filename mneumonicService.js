siteApp.factory('mneumonicFactory', ['$log','$window', function($log, $window) {

    var mneumonic = {};

    mneumonic.genpass = function(phrase) {

        //var inputSentence = "Baa, baa, black sheep,  Have you any wool?  Yes sir, yes sir, 3 bags full";
		//var inputSentence = "“These aren’t the droids you’re looking for...";
		//var inputSentence = "four score and seven years ago our fathers brought forth on this continent a new nation";
		//var inputSentence = "FOUR SCORE AND SEVEN YEARS AGO OUR FATHERS BROUGHT FORTH ON THIS CONTINENT A NEW NATION";
		//var inputSentence = "All the King's horses and all the King's men couldn't put Humpty together again!"

		var inputSentence = phrase;

		//  -------------------------------------------------------------------------------
		//  GLOBAL VARIABLES
		//  -------------------------------------------------------------------------------

		var debugThis = false;
		var debugThisSummary = true;

		var firstChars = [];  //array of first characters of words in sentence
		var lengthFL = 0;

		var thereIsUC = false;
		var thereIsLC = false;
		var thereIsNum	= false;
		var thereIsSC	= false;  // a special character exists in the firstChars
		var LCcount = 0;          // count of lowercase chars
		var UCcount = 0;			//count of uppercase chars

		var typeArray = [];
		var numericChars = ["0","1","2","3","4","5","6","7","8","9"]
		var specialChars = ["!","@","#","$","%","&","(",")","*","<",">","?","[","]","|","~"];
		var numericAndSpecialChars = ["0","1","2","3","4","5","6","7","8","9","!","@","#","$","%","&","(",")","*","<",">","?","[","]","|","~"]
		var insertIndex = 999;

		var trigrams = ["AAH","AAL","AAS","ABA","ABO","ABS","ABY","ACE","ACT","ADD","ADO","ADS","ADZ","AFF","AFT","AGA","AGE","AGO","AGS","AHA","AHI","AHS","AID","AIL","AIM","AIN","AIR","AIS","AIT","ALA","ALB","ALE","ALL","ALP","ALS","ALT","AMA","AMI","AMP","AMU","ANA","AND","ANE","ANI","ANT","ANY","APE","APO","APP","APT","ARB","ARC","ARE","ARF","ARK","ARM","ARS","ART","ASH","ASK","ASP","ASS","ATE","ATT","AUK","AVA","AVE","AVO","AWA","AWE","AWL","AWN","AXE","AYE","AYS","AZO","BAA","BAD","BAG","BAH","BAL","BAM","BAN","BAP","BAR","BAS","BAT","BAY","BED","BEE","BEG","BEL","BEN","BES","BET","BEY","BIB","BID","BIG","BIN","BIO","BIS","BIT","BIZ","BOA","BOB","BOD","BOG","BOO","BOP","BOS","BOT","BOW","BOX","BOY","BRA","BRO","BRR","BUB","BUD","BUG","BUM","BUN","BUR","BUS","BUT","BUY","BYE","BYS","CAB","CAD","CAM","CAN","CAP","CAR","CAT","CAW","CAY","CEE","CEL","CEP","CHI","CIG","CIS","COB","COD","COG","COL","CON","COO","COP","COR","COS","COT","COW","COX","COY","COZ","CRU","CRY","CUB","CUD","CUE","CUM","CUP","CUR","CUT","CWM","DAB","DAD","DAG","DAH","DAK","DAL","DAM","DAN","DAP","DAW","DAY","DEB","DEE","DEF","DEL","DEN","DEV","DEW","DEX","DEY","DIB","DID","DIE","DIF","DIG","DIM","DIN","DIP","DIS","DIT","DOC","DOE","DOG","DOL","DOM","DON","DOR","DOS","DOT","DOW","DRY","DUB","DUD","DUE","DUG","DUH","DUI","DUN","DUO","DUP","DYE","EAR","EAT","EAU","EBB","ECU","EDH","EDS","EEK","EEL","EFF","EFS","EFT","EGG","EGO","EKE","ELD","ELF","ELK","ELL","ELM","ELS","EME","EMS","EMU","END","ENG","ENS","EON","ERA","ERE","ERG","ERN","ERR","ERS","ESS","ETA","ETH","EVE","EWE","EYE","FAB","FAD","FAG","FAN","FAR","FAS","FAT","FAX","FAY","FED","FEE","FEH","FEM","FEN","FER","FES","FET","FEU","FEW","FEY","FEZ","FIB","FID","FIE","FIG","FIL","FIN","FIR","FIT","FIX","FIZ","FLU","FLY","FOB","FOE","FOG","FOH","FON","FOP","FOR","FOU","FOX","FOY","FRO","FRY","FUB","FUD","FUG","FUN","FUR","GAB","GAD","GAE","GAG","GAL","GAM","GAN","GAP","GAR","GAS","GAT","GAY","GED","GEE","GEL","GEM","GEN","GET","GEY","GHI","GIB","GID","GIE","GIG","GIN","GIP","GIT","GNU","GOA","GOB","GOD","GOO","GOR","GOS","GOT","GOX","GOY","GUL","GUM","GUN","GUT","GUV","GUY","GYM","GYP","HAD","HAE","HAG","HAH","HAJ","HAM","HAO","HAP","HAS","HAT","HAW","HAY","HEH","HEM","HEN","HEP","HER","HES","HET","HEW","HEX","HEY","HIC","HID","HIE","HIM","HIN","HIP","HIS","HIT","HMM","HOB","HOD","HOE","HOG","HON","HOP","HOS","HOT","HOW","HOY","HUB","HUE","HUG","HUH","HUM","HUN","HUP","HUT","HYP","ICE","ICH","ICK","ICY","IDS","IFF","IFS","IGG","ILK","ILL","IMP","INK","INN","INS","ION","IRE","IRK","ISM","ITS","IVY","JAB","JAG","JAM","JAR","JAW","JAY","JEE","JET","JEU","JEW","JIB","JIG","JIN","JOB","JOE","JOG","JOT","JOW","JOY","JUG","JUN","JUS","JUT","KAB","KAE","KAF","KAS","KAT","KAY","KEA","KEF","KEG","KEN","KEP","KEX","KEY","KHI","KID","KIF","KIN","KIP","KIR","KIS","KIT","KOA","KOB","KOI","KOP","KOR","KOS","KUE","KYE","LAB","LAC","LAD","LAG","LAM","LAP","LAR","LAS","LAT","LAV","LAW","LAX","LAY","LEA","LED","LEE","LEG","LEI","LEK","LES","LET","LEU","LEV","LEX","LEY","LEZ","LIB","LID","LIE","LIN","LIP","LIS","LIT","LOB","LOG","LOO","LOP","LOT","LOW","LOX","LUG","LUM","LUV","LUX","LYE","MAC","MAD","MAE","MAG","MAN","MAP","MAR","MAS","MAT","MAW","MAX","MAY","MED","MEG","MEL","MEM","MEN","MET","MEW","MHO","MIB","MIC","MID","MIG","MIL","MIM","MIR","MIS","MIX","MOA","MOB","MOC","MOD","MOG","MOL","MOM","MON","MOO","MOP","MOR","MOS","MOT","MOW","MUD","MUG","MUM","MUN","MUS","MUT","MYC","NAB","NAE","NAG","NAH","NAM","NAN","NAP","NAW","NAY","NEB","NEE","NEG","NET","NEW","NIB","NIL","NIM","NIP","NIT","NIX","NOB","NOD","NOG","NOH","NOM","NOO","NOR","NOS","NOT","NOW","NTH","NUB","NUN","NUS","NUT","OAF","OAK","OAR","OAT","OBA","OBE","OBI","OCA","ODA","ODD","ODE","ODS","OES","OFF","OFT","OHM","OHO","OHS","OIL","OKA","OKE","OLD","OLE","OMS","ONE","ONO","ONS","OOH","OOT","OPE","OPS","OPT","ORA","ORB","ORC","ORE","ORS","ORT","OSE","OUD","OUR","OUT","OVA","OWE","OWL","OWN","OXO","OXY","PAC","PAD","PAH","PAL","PAM","PAN","PAP","PAR","PAS","PAT","PAW","PAX","PAY","PEA","PEC","PED","PEE","PEG","PEH","PEN","PEP","PER","PES","PET","PEW","PHI","PHT","PIA","PIC","PIE","PIG","PIN","PIP","PIS","PIT","PIU","PIX","PLY","POD","POH","POI","POL","POM","POO","POP","POT","POW","POX","PRO","PRY","PSI","PST","PUB","PUD","PUG","PUL","PUN","PUP","PUR","PUS","PUT","PYA","PYE","PYX","QAT","QIS","QUA","RAD","RAG","RAH","RAI","RAJ","RAM","RAN","RAP","RAS","RAT","RAW","RAX","RAY","REB","REC","RED","REE","REF","REG","REI","REM","REP","RES","RET","REV","REX","RHO","RIA","RIB","RID","RIF","RIG","RIM","RIN","RIP","ROB","ROC","ROD","ROE","ROM","ROT","ROW","RUB","RUE","RUG","RUM","RUN","RUT","RYA","RYE","SAB","SAC","SAD","SAE","SAG","SAL","SAP","SAT","SAU","SAW","SAX","SAY","SEA","SEC","SEE","SEG","SEI","SEL","SEN","SER","SET","SEW","SEX","SHA","SHE","SHH","SHY","SIB","SIC","SIM","SIN","SIP","SIR","SIS","SIT","SIX","SKA","SKI","SKY","SLY","SOB","SOD","SOL","SOM","SON","SOP","SOS","SOT","SOU","SOW","SOX","SOY","SPA","SPY","SRI","STY","SUB","SUE","SUK","SUM","SUN","SUP","SUQ","SYN","TAB","TAD","TAE","TAG","TAJ","TAM","TAN","TAO","TAP","TAR","TAS","TAT","TAU","TAV","TAW","TAX","TEA","TED","TEE","TEG","TEL","TEN","TET","TEW","THE","THO","THY","TIC","TIE","TIL","TIN","TIP","TIS","TIT","TOD","TOE","TOG","TOM","TON","TOO","TOP","TOR","TOT","TOW","TOY","TRY","TSK","TUB","TUG","TUI","TUN","TUP","TUT","TUX","TWA","TWO","TYE","UDO","UGH","UKE","ULU","UMM","UMP","UNS","UPO","UPS","URB","URD","URN","URP","USE","UTA","UTE","UTS","VAC","VAN","VAR","VAS","VAT","VAU","VAV","VAW","VEE","VEG","VET","VEX","VIA","VID","VIE","VIG","VIM","VIS","VOE","VOW","VOX","VUG","VUM","WAB","WAD","WAE","WAG","WAN","WAP","WAR","WAS","WAT","WAW","WAX","WAY","WEB","WED","WEE","WEN","WET","WHA","WHO","WHY","WIG","WIN","WIS","WIT","WIZ","WOE","WOG","WOK","WON","WOO","WOP","WOS","WOT","WOW","WRY","WUD","WYE","WYN","XIS","YAG","YAH","YAK","YAM","YAP","YAR","YAW","YAY","YEA","YEH","YEN","YEP","YES","YET","YEW","YID","YIN","YIP","YOB","YOD","YOK","YOM","YON","YOU","YOW","YUK","YUM","YUP","ZAG","ZAP","ZAS","ZAX","ZED","ZEE","ZEK","ZEP","ZIG","ZIN","ZIP","ZIT","ZOA","ZOO","ZUZ","ZZZ","ING","ENT","THA","INT","TIO","TER","EST","ATI","VER","ITH","FTH","STH","OTH","ONT","DTH","REA","STO","TTH","STA","THI","EDT","SAN","RTH","ECO","IST","NGT","AST","COM","IVE","NCE","EDI","EIN","HEC","ESA","INA","ERI","ERT","AME","ITI","OME","EAN","ONA","EOF","HEA","INE","EDA","NTO","NIN","OVE","OUN","STR","ETO","SOF","NDE","STE","NTE","EAS","DTO","TOF","GHT","ESE","CHA","ICA","HEI","IDE","NDT","HAN","DER","ECT","TRA","IGH","STI","NDI","NAL","PLA","EEN","NTI","LAN","UND","NDA","NDS","NGA","HEL","HED","INC","ESI","GTH","ASA","NTS","HAV","HEF","IES","WER","CTI","REN","CAL","ENE","RST","EAL","NST","COU","TUR","MIN","ITY","YTH","ECA","OUL","LLE","ARD","ROU","ANC","OST","PRE","EFO","SSI","EMA","ESO","ATH","WOR","UST","HEB","EWA","SHO","IND","SED","HOU","LLY","ULD","ASE","URE","ELE","ENC","NAT","EAD","WHE","BLE","ANS","ALI","SCO","ERO","WHI","CES","NTA","BER","VEN","TIM","ISA","NGS","NES","TAL","EDO","IME","ACK","TES","PLE","OUS","TTO","ORM","NED","ISS","ITE","NGE","LLI","EDE","SSE","ADE","RIE","EMO","RAL","OIN","HTH","TRE","AKE","MER","RIC","ISH","OUG","INI","ONG","NTR","ELI","WIL","SAR","EDB","SPE","SAI","NDO","SHI","ORD","ENA","POR","IAL","ORI","TTE","EPR","ACH","HAR","TRI","CHE","UNT","OMP","RIT","DED","HEE","THR","EIR","OND","MES","EFI","NER","ELA","LSO","RIS","ISI","CEN","ARI","TOB","NSI","DES","FTE","ANG","SIO","IAN","EIS","TSA","NGI","UNI","SES","RAC","ABL","ETI","EBE","EHA","ONI","VES","ERC","OFA","RSA","NOF","GRE","ETE","CHO","SWE","ESP","PRI","TIV","ROF","GRA","LLO","EAC","NIS","GTO","ENO","BOU","ESH","TOS","ERY","RMA","NGO","EWI","ARA","RTO","REL","OMA","ASI","TST","UTT","IRS","YAN","LLA","SFO","ORK","ETT","LTH","SID","ASO","SWI","ITA","ERM","EPA","RON","DRE","TLE","DBY","BEC","MBE","TOA","HEG","SCH","RTI","HEO","OLL","ELO","TRO","LIC","HIL","ILE","THT","RRE","OLI","RSO","NSA","OMM","CRE","ATA","ISE","CIA","POS","GER","SMA","UTI","STS","SBE","ENI","SRE","LON","ISC","NSE","ANO","NCO","ITT","SNO","EPO","EAM","ESC","FIC","ECH","VED","IKE","ALO","YOF","OTE","OOK","ERF","ONC","EMI","ECI","ATS","ERV","RSI","SST","ILI","EED","ARY","SSO","MTH","VEL","DAT","MEA","ESU","URI","RCH","UTH","SPO","WOU","FFE","RGE","RSE","USI","EGA","SAS","SSA","ATO","ERW","OOD","ECE","MPL","TSO","ARR","DEA","SCA","DOF","UAL","DBE","EWO","NSO","RTE","VIN","ADI","NDW","NDH","EDF","SWH","TOC","TCH","EWH","EBA","ONL","TEM","DWI","LEC","EOP","EHE","DFO","IEN","UCH","NDC","ELY","DST","ICI","EDW","AUS","NFO","NTT","NNE","SUR","EXP","KET","INF","ETR","YTO","RDE","RCE","OMT","EVI","ARL","YST","LIK","GES","CTO","LLS","RNE","NDR","DAS","SSU","SPR","OPL","ESW","ONF","OMI","DUC","TAI","ULT","EMB","IGN","HOO","NEA","ITW","PPE","FFI","ULA","CED","LOS","NAS","OLO","TWE","ANN","OTA","ISO","TCO","GRO","EFE","ONW","BEA","NGL","EDU","REW","ORY","ERB","BAC","LEN","NLY","ARO","EHI","MPA","IVI","ICT","STT","RTA","HRE","ERH","EET","SOR","EPE","NCH","TRU","MAL","CTE","NDM","ATC","FAC","TWI","DCO","NDP","FRE","OFS","ARG","IMA","DEC","OWI","EIT","KED","BLI","ETW","CLU","HOL","RRI","SLA","ROP","OFI","TOH","NON","OOL","ISP","MAK","EQU","LYT","LYA","CIT","VEA","KNO","TAK","ACC","CER","ADA","NGW","PEO","DSO","RDI","TOU","CAU","ROV","TFO","STU","TLY","IED","UES","TSI","LER","WEL","EPL","HOR","ERP","HRO","OSS","TBE","TYO","HEU","BYT","NGF","NGH","HAL","ROL","ATU","SAM","HOM","DHI","ILD","GAI","RDS","INO","EGI","LLT","OTO","CLE","DHE","ACO","ORL","CAS","RIV","OFC","ORN","RNA","URS","AVI","NAR","UBL","TTI","AMO","RME","QUI","QUE","NDF","INH","EHO","NCL","OCK","VIC","RTS","ETS","CLA","TSE","EOR","NCI","SLI","RCO","LOC","EBU","HIG","EXT","EGR","DIA","BRI","CEI","ALC","PPO","OFH","CKE","ATW","CEA","OTT","NSH","MAI","DAR","ASB","RFO","OWA","UDE","RSH","IFI","UAR","CET","OVI","NDB","TOL","UTO","LEM","RIO","UCT","EFR","SDE","DHA","BIL","SUC","EBO","ORO","SEV","MIT","YCO","NWH","NEO","RVI","EUN","SIG","THS","ASC","DSA","TAC","EMP","ANK","RKE","NHE","NME","NRE","ROS","NGC","UNC","NIC","NNI","URA","FUL","OCO","OSI","NGR","TEC","NBE","YRE","NTL","DGE","SFR","TSH","ISN","LDI","EAG","NDL","SMO","ORG","LLB","IAT","URT","KER","TMA","BEI","LYS","DWA","NMA","EFA","INV","ISL","PON","LIA","REO","LIF","TIA","CRI","NSU","RLY","LBE","OHA","NDD","EPT","EBR","NGP","YHA","TME","LEF","OFM","DMA","DUR","MME","IZE","ICS","YBE","DNO","EGE","DDE","CUL","MEO","LCO","VAL","ATR","NDU","DET","ISF","OFP","SPI","LDE","OTI","DEM","BEF","MOV","IOU","SWA","ERL","IMI","FAM","NEX","LOF","SCR","ISW","ULL","ERD","INM","SOC","RNI","APA","DEP","RDA","OGR","ESF","IDA","CKS","GEO","LUD","NHI","IFE","DDI","CEO","NGB","KES","YER","NWA","DRA","LYI","ODU","INU","ORR","AYA","LOR","TTL","NHA","LDB","LIV","EDR","SEO","OAD","RMO","DLE","ECR","UDI","GON","ALF","RWA","LST","LIG","RMI","OFE","URC","AYI","FRI","ILA","RYO","ALM","NWI","NNO","ABI","RVE","EES","AKI","BOR","DOU","EEP","ORP","ITO","AYT","ONH","TUD","NYO","SBU","DIC","DRI","OFO","OAN","RUS","XPE","NCA","NVE","ILY","LRE","ECL","DSE","OUP","LEO","UPP","ROA","NAD","NTW","URR","YFO","OMO","ONM","NTU","OWS","RSW","ASW","ASN","CCE","CRO","IER","CCO","TSW","OWT","ASM","NGM","CTS","NOU","TTA","EDM","LIO","NEY","ONB","SFI","EEM","UMB","CRA","ANU","SWO","WEV","EIG","SSH","EUS","EYO","GLE","CIE","REH","WTH","SLO","EER","IFT","HEV","TUA","EPU","GOV","CIN","INW","INP","WES","AMS","ITU","OAC","OPP","ETU","SUS","LAI","ARN","EEA","ITC","ISR","TCA","RLD","ALR","CTU","LTO","OGE","EAP","PTI","EDP","FEA","TWH","NGU","VEB","UIL","ROO","RPR","RLI","MPO","ISB","DFR","OON","SLE","MOU","NEV","NEC","CLO","IEL","USA","APR","EDC","RER","FRA","WEA","NEN","ALW","ESB","EYA","NEI","NSW","ELP","OLA","EAK","ESN","RYT","ORH","ANB","LSA","GIV","DPR","EAB","LTI","HOF","ASU","SAF","EWS","STW","EEX","ATM","MPE","TBA","INB","EAV","DWH","ENH","RRO","NSP","MTO","AGR","LEW","RHA","LVE","ODO","LWA","GUE","DCA","RAR","RWH","PAI","ROG","NFR","FAL","ONN","INL","SEP","SMI","VEM","CUS","EPI","WAL","DSH","THC","AAN","ODI","FOL","GOF","SQU","SFA","NAC","RGA","VIL","NGD","OCI","HIR","RHE","USS","EFU","YWI","ESM","YWA","NPR","UME","OSA","DRO","GHE","OPR","LDS","KAN","RPO","ORW","ISD","DMI","GOI","OFR","ONP","IDI","RWI","HTO","EDD","STP","SNE","SEM","ERU","ADT","BUI","MMI","ALK","IBL","OPU","ALD","OAL","YSA","TSC","IDT","PLI","MUC","NUM","SBA","NEL","NIA","ENU","RUC","LYO","STM","BRE","TOI","ESD","DMO","RYI","OTS","SDA","VOL","ACA","RBE","EXA","YED","LSE","ACI","STC","OFW","LIM","ATL","FLO","RNO","CHT","AUG","RYS","UPT","SPL","RTY","EVA","YSI","OFB","LDR","UIT","CLI","MEI","IOR","IRA","LYW","IGI","SIV","TPR","LDA","AYO","RKI","IDN","NIO","IVA","TYA","PHO","COA","ILT","CHR","NDG","EYW","RAF","YIS","ASR","NOV","LYB","AUT","NDN","GFO","NTY","ASF","OOR","ENN","SDI","HUR","STL","LYC","DIR","AFE","DNE","KTH","PLO","RAB","NFI","YMA","OFL","UNG","ANW","TMO","ENW","TSS","JEC","FOO","GIS","TNE","USH","RNM","TSP","NSC","GEA","DIV","DSI","FCO","OPO","FHI","EDL","YOR","YCA","IEV","YWE","OMB","IRD","TIF","DLI","RHI","RCA","GHA","PTH","SGO","YWH","GWI","ATP","LEB","TSU","CKI","FEC","NCR","RLE","SME","TDO","OLU","IEW","YSE","UCE","FAI","NIG","TLI","TSF","RBA","ENB","BLA","RSC","THH","MPI","MMU","LFO","GST","ASD","EGU","SNT","TNO","ADV","IET","BYA","NVI","OFD","COV","RRA","NLI","LTE","UCA","DWE","TEI","NUE","FLA","SDO","RIL","IRO","IAM","TEV","ESL","MPR","EDG","ICO","YAL","YLE","NTF","STB","LYD","HTE","CEM","YAS","KEE","NTC","NTB","UNE","NEM","EOU","OUC","PPL","THU","TEX","ICU","RDO","SUL","OSP","EXC","OTB","GNE","KIL","LOV","SYS","IMS","NIV","OOM","STF","IRC","OHI","NMO","ASL","ONV","TDE","OCE","EBI","PTO","LDH","YPE","NIE","NSF","ELT","IBE","NPA","LYM","TYT","TYP","DNT","LUE","URO","OWH","OHE","BLO","WRI","HTS","RKS","DEO","HRI","LYR","DUS","AYB","CHU","TFR","WOM","YDE","REQ","GGE","FFO","UMA","VIO","INR","RTU","ROR","TAF","MEE","INJ","MSE","VEI","HEK","URY","PPR","TEP","DAC","ACR","MMA","ENR","UTW","ONR","NJU","EYS","KTO","ORF","PTE","CID","YSH","EAF","TLA","CKA","SIA","OBL","UEN","RSU","OKI","UAT","UET","AJO","CKT","CHW","OAS","LLH","SBO","MST","SCU","RRY","EEV","LMA","LYF","VEH","IDO","OIS","TEO","SCI","OWO","UCK","DCH","IRT","OPA","RSS","AGU","RSP","ULE","EKI","BEH","OYE","NWE","ADY","YPR","NKI","NFE","SSP","LOU","YMO","URG","PRA","DME","EDN","SAV","ICL","OPI","LYP","KOF","NLA","LDT","RAV","TFI","RFA","NHO","DBA","CEW","SKE","ENF","NNA","TPA","DFI","ANH","API","RPA","LLC","IPA","ADM","GLA","ABE","ETY","GCO","RMS","LDN","YAT","ANP","DLA","IRI","NBU","NTP","OLS","DPA","LMO","GUA","IRL","NEF","RBO","LYH","SCE","ANF","GNI","IFY","NLE","EPH","EFL","MMO","IGA","JOH","SRA","ISG","TIR","TTR","THM","YDI","FEL","JOR","DPO","RTR","YSO","DHO","LPR","RLA","KSA","CTA","MPT","YHE","NOL","OSO","HEJ","ALU","GLI","ITL","CKO","THW","BLY","DSU","HWA","TSB","OFG","RFI","OTR","WNA","OHN","GIO","MEC","NFL","ILM","DBU","OGI","FLI","UCC","NBA","FLE","EIV","EOT","UNN","NTM","EVO","HAI","LDO","NFA","SSC","LUS","NAF","IWA","EUP","CIP","CHS","ATF","AMB","ODY","AGI","YME","EXI","TPE","RPE","IMM","TBU","CTT","LLP","LHA","TDI","ILS","EUR","LBU","TYI","GSA","NIF","NKS","WNT","ATB","DDO","LEP","MSA","ENM","YWO"];



		//  -------------------------------------------------------------------------------
		//  FUNCTIONS
		//  -------------------------------------------------------------------------------

		//  -------------------------------------------------------------------------------
		//	FUNCTION
		//  flip a coin
		//	return 0 or 1
		//  -------------------------------------------------------------------------------
		function coinFlip()
			{
				// return random 0 or 1
				var flipResult = 0;
			    var headsTails = Math.random();
			    if (headsTails < 0.5) {
			    	flipResult = 0;
			    } else {
			    	flipResult = 1;
			    }
			    return flipResult;
			}

		//  -------------------------------------------------------------------------------
		//	FUNCTION
		//  calculate random index given max size
		//	return the index
		//  -------------------------------------------------------------------------------
		function randomIndex(max)
			{
				// return random index but not 0 or last
			    var newIndex = Math.floor(Math.random()*max);
			    if (newIndex == 0) {
			    	newIndex++;
			    }
			    if (newIndex == max) {
			    	newIndex--;
			    }
			    return newIndex;
			}


		//  -------------------------------------------------------------------------------
		//	FUNCTION
		//  flip a random alphabetic character to uppercase or lowercase
		//  -------------------------------------------------------------------------------
		function upperOrLowerRandom(updateTypeUL) {
				if (updateTypeUL == "U") {
					targetTypeUL = "L";
				}
				if (updateTypeUL == "L") {
					targetTypeUL = "U";
				}
				var indexUL = randomIndex(lengthFL);
				while (targetTypeUL != typeArray[indexUL]) {
					indexUL = randomIndex(lengthFL);
				}
				if (updateTypeUL == "U") {
					firstChars[indexUL] = firstChars[indexUL].toUpperCase();
				}

				if (updateTypeUL == "L") {
					firstChars[indexUL] = firstChars[indexUL].toLowerCase();
				}
				
				typeArray[indexUL] = updateTypeUL;  // update type array to reflect change

				if (debugThisSummary) {
					$log.debug("upperOrLowerRandom function - flipped the case of this char " + firstChars[indexUL] + " at index " + indexUL);
				}
		
		} // end function upperOrLowerRandom

		//
		//  -------------------------------------------------------------------------------
		//	FUNCTION
		//  scan for common trigrams
		//	return the index to the trigram or 999 if no trigrams found
		//  -------------------------------------------------------------------------------
		//
		function findTrigrams() {

			var thisSlice = [];
			var thisStr = "";

			for (i = 0; i < lengthFL - 2; i++) {
				thisSlice = firstChars.slice(i, i+3)
				thisStr = thisSlice.toString();
				thisStr = thisStr.replace(/[,]/g, "");
				if (debugThis) {
					$log.debug("this slice - ");
					$log.debug(thisStr);
				}

				for (j = 0; j < trigrams.length; j++) {
					if (thisStr.toUpperCase() == trigrams[j]) {

						if (debugThisSummary) {
							$log.debug("found trigram - ");
							$log.debug(thisSlice + " at index " + i);
						}

						return(i);
					}
				}

			}

			if (debugThisSummary) {
				$log.debug("exit findTrigrams return 999");
			}

			return(999);

		}  // end function findTrigrams


		//  -------------------------------------------------------------------------------
		//	FUNCTION
		//  add random numeric or special character
		//	given index to beginning of trigram and the type of char to add
		//  -------------------------------------------------------------------------------
		function addRandom (indexSC, charType) {

			indexSC++;  // move index over 1 char from beginning of trigram

			if (charType == "N") {
				thisCharArray = numericChars;
			} else if (charType == "S") {
						thisCharArray = specialChars; 
					} 	else {
							thisCharArray = numericAndSpecialChars;
						}

			var maxSC = thisCharArray.length;
			var randSCIndex = Math.floor(Math.random()*(maxSC - 1));
			var spliceSC = thisCharArray[randSCIndex];
			firstChars.splice(indexSC, 0, spliceSC);

			if (debugThisSummary) {
				$log.debug("this is the added character")
				$log.debug(spliceSC, " at index ", String(indexSC));	
			}

			// reset the character array length
			lengthFL = firstChars.length;

			// recreate the type array
			determineType();

			if (debugThis) {
				$log.debug("array of types after adding random special characters - ");
				$log.debug(typeArray);	
			}


		}


		//  -------------------------------------------------------------------------------
		//	FUNCTION
		//  determine if there are any upper case, lower case and numerics
		//  create an array of types that corresponds to the array of first characters
		//	set "thereis" flag to show that a character of that type exists
		//		in the first character array
		//
		//  -------------------------------------------------------------------------------
		function determineType () {

			var i = 0;
			var tempChar = "";
			var flagSC = false;
			LCcount = 0;
			UCcount = 0;

			while (i < lengthFL) {

				tempChar = firstChars[i];

				flagSC = testSpecialChar(tempChar);

				if (!isNaN(tempChar * 1)) {
					thereIsNum = true;
					typeArray[i] = "N";

					if (debugThis) {
						$log.debug("there is numeric - " + tempChar);
					}


				} else	if (flagSC == true) {
							thereIsSC = true;
							typeArray[i] = "S";

							if (debugThis) {
								$log.debug("there is special character - " + tempChar);
							}

						} else	if (tempChar == tempChar.toLowerCase()) {
									thereIsLC = true;
									typeArray[i] = "L";
									LCcount++;

									if (debugThis) {
										$log.debug("there is lowercase - " + tempChar);
									}

								} else	 if (tempChar == tempChar.toUpperCase()) {
											thereIsUC = true;
											typeArray[i] = "U";
											UCcount++;

											if (debugThis) {
												$log.debug("there is uppercase - " + tempChar);
											}

										}

				i++;

			} // end of while

		}

		//  -------------------------------------------------------------------------------
		//	FUNCTION
		//  test to see if parameter is a special character
		//	given the character to be tested
		//	return true or false
		//  
		//  -------------------------------------------------------------------------------
		function testSpecialChar (testChar) {


			var scFlag = false;


			for (sc = 0; sc < specialChars.length; sc++) {

			//	$log.debug("scArrayChar " + specialChars[sc]);

				if (testChar == specialChars[sc]) {

					if (debugThis) {
						$log.debug("testSpecialChar function -  testChar is " + testChar + "  special char array item match is " + specialChars[sc]);			
					}

					scFlag = true;
				} 


			}

			return scFlag;

		}

		//  -------------------------------------------------------------------------------
		//  RUN THIS CODE
		//  -------------------------------------------------------------------------------

		//  -------------------------------------------------------------------------------
		//  get first letters of each word in input
		// 
		inputSentence = inputSentence.replace(/['’]/g, "");
		firstChars = inputSentence.match(/\b\w/gm);
		lengthFL = firstChars.length;
		saveFirstChars = firstChars.toString();
		saveFirstChars = saveFirstChars.replace(/[,]/g, "");

		if (debugThisSummary) {
			$log.debug("First characters of each word - ");
			$log.debug(saveFirstChars);
		}

		//  -------------------------------------------------------------------------------
		//  initially create corresponding array of character type indicators
		// 

		determineType();

		if (debugThisSummary) {
			$log.debug("initial array of types - ");
			$log.debug(typeArray);
			$log.debug("lowercase count is " + LCcount);
			$log.debug("uppercase count is " + UCcount);
		}

		//  -------------------------------------------------------------------------------
		//  validate input
		//
		var alertObj = {
			pass:	"InvalidEntryNumberOfWords",
			score:  1,
			crack:	""
		};

		if (LCcount+UCcount < 6) {
			if (debugThisSummary) {
				$log.warn("Exiting mneumonic = early");
			}
			return alertObj;
		}


		//  -------------------------------------------------------------------------------
		//  flip a randomly chosen character to upper or lower case if no such case exist
		//

		if (thereIsUC == false) {
			upperOrLowerRandom("U");
		}

		if (thereIsLC == false) {
			upperOrLowerRandom("L");
		}

		// ---------------------------------------------------------------------------------
		// while loop to find trigrams
		//

		insertIndex = findTrigrams();  // initialize by finding 1st trigram

		while (insertIndex != 999) {

			if (thereIsSC == false && thereIsNum == false) { // this is to insert either numeric or special char if neither exits
				chooseNorSC = coinFlip();
				if (chooseNorSC == 0) {
					addRandom(insertIndex, "N");
					if (debugThisSummary) {
						$log.debug("neither numeric or special char exists - coin flip chose to insert numeric")
					}
				} else {
					addRandom(insertIndex, "S");
					if (debugThisSummary) {
						$log.debug("neither numeric or special char exists - coin flip chose to insert special char")
					}
				}

			} else	if (thereIsSC == false && thereIsNum == true) {	// this to explicitly insert a special char if one does not exist
						addRandom(insertIndex, "S");
						if (debugThisSummary) {
							$log.debug("special character does not exist but numeric does so insert special");
						}

				} else	if (thereIsSC == true && thereIsNum == false) {	// this to explicitly insert a numerics char if one does not exist
							addRandom(insertIndex, "N");
							if (debugThisSummary) {
								$log.debug("special character does exist but numeric does not so insert numeric");
							}


					} else	if (thereIsSC == true && thereIsNum == true) {  // there is at least 1 numeric and 1 special character so insert either
								addRandom(insertIndex, "any");
								if (debugThisSummary) {
									$log.debug("both numeric and special character exists so add either")
								}	
							}

			// find more trigrams
			insertIndex = findTrigrams();

		} 
		// end while to find trigrams


		// ---------------------------------------------------------------------------------
		// one last look to ensure there is at least 1 numeric and 1 special char
		// because no insertions due to trigrams may have occurred
		//

		if (thereIsNum == false) {		// this is to ensure at least 1 numeric char

			if (debugThisSummary) {
				$log.debug("last look - password still does not contain a numeric")
			}

			addRandom(randomIndex(lengthFL) , "N");
		} 

		if (thereIsSC == false) {	// this is to ensure at least 1 special char

				if (debugThisSummary) {
					$log.debug("last look - password still does not contain a special character");
				}

				addRandom(randomIndex(lengthFL), "S");
		}

		// ---------------------------------------------------------------------------------
		// gather the final password array into a string
		//
		var passFL = firstChars.toString();

		if (debugThis) {
			$log.debug("final array - ")
			$log.debug(passFL);
		}

		// ---------------------------------------------------------------------------------
		// remove array commas from string
		//
		passFL = passFL.replace(/[,]/g, "");

		if (debugThisSummary) {
			$log.debug("final string with commas removed - ")
			$log.debug(passFL);
		}

		var strengthResult = zxcvbn(passFL);


		if (debugThisSummary) {
			$log.debug("Strength is " + strengthResult.score);
			$log.debug("Time to crack is " + strengthResult.crack_times_display.offline_slow_hashing_1e4_per_second);
			$log.debug("Number of guesses to crack " + strengthResult.guesses);
			$log.info("Exiting mneumonic - finished");
		}

		var mneumonicObj = {
			pass:	passFL,
			score:  strengthResult.score,
			crack:	strengthResult.crack_times_display.offline_slow_hashing_1e4_per_second
		}

		return mneumonicObj;
		
    }  // end of genpass function

    return mneumonic;

}]); // end of factory