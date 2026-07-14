// Generated from IsnowParser.g4 by ANTLR 4.13.2
// jshint ignore: start
import antlr4 from 'antlr4';
import IsnowParserListener from './IsnowParserListener.js';
import IsnowParserVisitor from './IsnowParserVisitor.js';

const serializedATN = [4,1,16,151,2,0,7,0,2,1,7,1,2,2,7,2,2,3,7,3,2,4,7,
4,2,5,7,5,2,6,7,6,2,7,7,7,2,8,7,8,2,9,7,9,2,10,7,10,2,11,7,11,2,12,7,12,
1,0,3,0,28,8,0,1,0,1,0,5,0,32,8,0,10,0,12,0,35,9,0,1,0,3,0,38,8,0,1,0,1,
0,1,1,3,1,43,8,1,1,1,1,1,1,1,1,2,1,2,1,3,1,3,1,3,5,3,53,8,3,10,3,12,3,56,
9,3,1,4,1,4,1,4,3,4,61,8,4,1,5,3,5,64,8,5,1,5,1,5,3,5,68,8,5,4,5,70,8,5,
11,5,12,5,71,1,6,3,6,75,8,6,1,6,1,6,3,6,79,8,6,4,6,81,8,6,11,6,12,6,82,1,
7,1,7,1,8,3,8,88,8,8,1,8,1,8,1,8,5,8,93,8,8,10,8,12,8,96,9,8,1,9,3,9,99,
8,9,1,9,1,9,1,9,3,9,104,8,9,1,9,3,9,107,8,9,1,9,3,9,110,8,9,1,10,1,10,1,
10,1,10,1,10,5,10,117,8,10,10,10,12,10,120,9,10,1,10,1,10,1,10,1,10,1,10,
1,10,1,10,5,10,129,8,10,10,10,12,10,132,9,10,1,10,1,10,3,10,136,8,10,1,11,
1,11,1,11,4,11,141,8,11,11,11,12,11,142,3,11,145,8,11,1,12,1,12,3,12,149,
8,12,1,12,0,0,13,0,2,4,6,8,10,12,14,16,18,20,22,24,0,1,1,0,1,4,163,0,27,
1,0,0,0,2,42,1,0,0,0,4,47,1,0,0,0,6,49,1,0,0,0,8,60,1,0,0,0,10,63,1,0,0,
0,12,74,1,0,0,0,14,84,1,0,0,0,16,87,1,0,0,0,18,109,1,0,0,0,20,135,1,0,0,
0,22,144,1,0,0,0,24,146,1,0,0,0,26,28,5,16,0,0,27,26,1,0,0,0,27,28,1,0,0,
0,28,29,1,0,0,0,29,33,3,6,3,0,30,32,3,2,1,0,31,30,1,0,0,0,32,35,1,0,0,0,
33,31,1,0,0,0,33,34,1,0,0,0,34,37,1,0,0,0,35,33,1,0,0,0,36,38,5,16,0,0,37,
36,1,0,0,0,37,38,1,0,0,0,38,39,1,0,0,0,39,40,5,0,0,1,40,1,1,0,0,0,41,43,
5,16,0,0,42,41,1,0,0,0,42,43,1,0,0,0,43,44,1,0,0,0,44,45,3,4,2,0,45,46,3,
6,3,0,46,3,1,0,0,0,47,48,7,0,0,0,48,5,1,0,0,0,49,54,3,8,4,0,50,51,5,16,0,
0,51,53,3,8,4,0,52,50,1,0,0,0,53,56,1,0,0,0,54,52,1,0,0,0,54,55,1,0,0,0,
55,7,1,0,0,0,56,54,1,0,0,0,57,61,3,10,5,0,58,61,3,12,6,0,59,61,3,14,7,0,
60,57,1,0,0,0,60,58,1,0,0,0,60,59,1,0,0,0,61,9,1,0,0,0,62,64,3,16,8,0,63,
62,1,0,0,0,63,64,1,0,0,0,64,69,1,0,0,0,65,67,5,5,0,0,66,68,3,16,8,0,67,66,
1,0,0,0,67,68,1,0,0,0,68,70,1,0,0,0,69,65,1,0,0,0,70,71,1,0,0,0,71,69,1,
0,0,0,71,72,1,0,0,0,72,11,1,0,0,0,73,75,3,16,8,0,74,73,1,0,0,0,74,75,1,0,
0,0,75,80,1,0,0,0,76,78,5,6,0,0,77,79,3,16,8,0,78,77,1,0,0,0,78,79,1,0,0,
0,79,81,1,0,0,0,80,76,1,0,0,0,81,82,1,0,0,0,82,80,1,0,0,0,82,83,1,0,0,0,
83,13,1,0,0,0,84,85,3,16,8,0,85,15,1,0,0,0,86,88,5,8,0,0,87,86,1,0,0,0,87,
88,1,0,0,0,88,89,1,0,0,0,89,94,3,18,9,0,90,91,5,9,0,0,91,93,3,18,9,0,92,
90,1,0,0,0,93,96,1,0,0,0,94,92,1,0,0,0,94,95,1,0,0,0,95,17,1,0,0,0,96,94,
1,0,0,0,97,99,5,10,0,0,98,97,1,0,0,0,98,99,1,0,0,0,99,100,1,0,0,0,100,103,
3,22,11,0,101,102,5,10,0,0,102,104,3,22,11,0,103,101,1,0,0,0,103,104,1,0,
0,0,104,106,1,0,0,0,105,107,3,20,10,0,106,105,1,0,0,0,106,107,1,0,0,0,107,
110,1,0,0,0,108,110,3,20,10,0,109,98,1,0,0,0,109,108,1,0,0,0,110,19,1,0,
0,0,111,112,5,11,0,0,112,113,5,12,0,0,113,118,3,24,12,0,114,115,5,9,0,0,
115,117,3,24,12,0,116,114,1,0,0,0,117,120,1,0,0,0,118,116,1,0,0,0,118,119,
1,0,0,0,119,121,1,0,0,0,120,118,1,0,0,0,121,122,5,13,0,0,122,136,1,0,0,0,
123,124,5,10,0,0,124,125,5,12,0,0,125,130,3,24,12,0,126,127,5,9,0,0,127,
129,3,24,12,0,128,126,1,0,0,0,129,132,1,0,0,0,130,128,1,0,0,0,130,131,1,
0,0,0,131,133,1,0,0,0,132,130,1,0,0,0,133,134,5,13,0,0,134,136,1,0,0,0,135,
111,1,0,0,0,135,123,1,0,0,0,136,21,1,0,0,0,137,145,5,7,0,0,138,145,5,15,
0,0,139,141,3,24,12,0,140,139,1,0,0,0,141,142,1,0,0,0,142,140,1,0,0,0,142,
143,1,0,0,0,143,145,1,0,0,0,144,137,1,0,0,0,144,138,1,0,0,0,144,140,1,0,
0,0,145,23,1,0,0,0,146,148,5,14,0,0,147,149,5,15,0,0,148,147,1,0,0,0,148,
149,1,0,0,0,149,25,1,0,0,0,24,27,33,37,42,54,60,63,67,71,74,78,82,87,94,
98,103,106,109,118,130,135,142,144,148];


const atn = new antlr4.atn.ATNDeserializer().deserialize(serializedATN);

const decisionsToDFA = atn.decisionToState.map( (ds, index) => new antlr4.dfa.DFA(ds, index) );

const sharedContextCache = new antlr4.atn.PredictionContextCache();

export default class IsnowParser extends antlr4.Parser {

    static grammarFileName = "IsnowParser.g4";
    static literalNames = [ null, "'>='", "'<='", "'>'", "'<'", "'/'", "':'", 
                            "'*'", "'!'", "','", "'-'", "'+'", "'['", "']'" ];
    static symbolicNames = [ null, "GE", "LE", "GT", "LT", "SLASH", "COLON", 
                             "STAR", "BANG", "COMMA", "DASH", "PLUS", "LBRACK", 
                             "RBRACK", "NUMBER", "NAME", "GSEP" ];
    static ruleNames = [ "pattern", "bound", "boundOp", "spec", "group", 
                         "dateGroup", "timeGroup", "bareGroup", "field", 
                         "term", "incr", "atom", "qty" ];

    constructor(input) {
        super(input);
        this._interp = new antlr4.atn.ParserATNSimulator(this, atn, decisionsToDFA, sharedContextCache);
        this.ruleNames = IsnowParser.ruleNames;
        this.literalNames = IsnowParser.literalNames;
        this.symbolicNames = IsnowParser.symbolicNames;
    }



	pattern() {
	    let localctx = new PatternContext(this, this._ctx, this.state);
	    this.enterRule(localctx, 0, IsnowParser.RULE_pattern);
	    var _la = 0;
	    try {
	        this.enterOuterAlt(localctx, 1);
	        this.state = 27;
	        this._errHandler.sync(this);
	        _la = this._input.LA(1);
	        if(_la===16) {
	            this.state = 26;
	            this.match(IsnowParser.GSEP);
	        }

	        this.state = 29;
	        this.spec();
	        this.state = 33;
	        this._errHandler.sync(this);
	        var _alt = this._interp.adaptivePredict(this._input,1,this._ctx)
	        while(_alt!=2 && _alt!=antlr4.atn.ATN.INVALID_ALT_NUMBER) {
	            if(_alt===1) {
	                this.state = 30;
	                this.bound(); 
	            }
	            this.state = 35;
	            this._errHandler.sync(this);
	            _alt = this._interp.adaptivePredict(this._input,1,this._ctx);
	        }

	        this.state = 37;
	        this._errHandler.sync(this);
	        _la = this._input.LA(1);
	        if(_la===16) {
	            this.state = 36;
	            this.match(IsnowParser.GSEP);
	        }

	        this.state = 39;
	        this.match(IsnowParser.EOF);
	    } catch (re) {
	    	if(re instanceof antlr4.error.RecognitionException) {
		        localctx.exception = re;
		        this._errHandler.reportError(this, re);
		        this._errHandler.recover(this, re);
		    } else {
		    	throw re;
		    }
	    } finally {
	        this.exitRule();
	    }
	    return localctx;
	}



	bound() {
	    let localctx = new BoundContext(this, this._ctx, this.state);
	    this.enterRule(localctx, 2, IsnowParser.RULE_bound);
	    var _la = 0;
	    try {
	        this.enterOuterAlt(localctx, 1);
	        this.state = 42;
	        this._errHandler.sync(this);
	        _la = this._input.LA(1);
	        if(_la===16) {
	            this.state = 41;
	            this.match(IsnowParser.GSEP);
	        }

	        this.state = 44;
	        this.boundOp();
	        this.state = 45;
	        this.spec();
	    } catch (re) {
	    	if(re instanceof antlr4.error.RecognitionException) {
		        localctx.exception = re;
		        this._errHandler.reportError(this, re);
		        this._errHandler.recover(this, re);
		    } else {
		    	throw re;
		    }
	    } finally {
	        this.exitRule();
	    }
	    return localctx;
	}



	boundOp() {
	    let localctx = new BoundOpContext(this, this._ctx, this.state);
	    this.enterRule(localctx, 4, IsnowParser.RULE_boundOp);
	    var _la = 0;
	    try {
	        this.enterOuterAlt(localctx, 1);
	        this.state = 47;
	        _la = this._input.LA(1);
	        if(!((((_la) & ~0x1f) === 0 && ((1 << _la) & 30) !== 0))) {
	        this._errHandler.recoverInline(this);
	        }
	        else {
	        	this._errHandler.reportMatch(this);
	            this.consume();
	        }
	    } catch (re) {
	    	if(re instanceof antlr4.error.RecognitionException) {
		        localctx.exception = re;
		        this._errHandler.reportError(this, re);
		        this._errHandler.recover(this, re);
		    } else {
		    	throw re;
		    }
	    } finally {
	        this.exitRule();
	    }
	    return localctx;
	}



	spec() {
	    let localctx = new SpecContext(this, this._ctx, this.state);
	    this.enterRule(localctx, 6, IsnowParser.RULE_spec);
	    try {
	        this.enterOuterAlt(localctx, 1);
	        this.state = 49;
	        this.group();
	        this.state = 54;
	        this._errHandler.sync(this);
	        var _alt = this._interp.adaptivePredict(this._input,4,this._ctx)
	        while(_alt!=2 && _alt!=antlr4.atn.ATN.INVALID_ALT_NUMBER) {
	            if(_alt===1) {
	                this.state = 50;
	                this.match(IsnowParser.GSEP);
	                this.state = 51;
	                this.group(); 
	            }
	            this.state = 56;
	            this._errHandler.sync(this);
	            _alt = this._interp.adaptivePredict(this._input,4,this._ctx);
	        }

	    } catch (re) {
	    	if(re instanceof antlr4.error.RecognitionException) {
		        localctx.exception = re;
		        this._errHandler.reportError(this, re);
		        this._errHandler.recover(this, re);
		    } else {
		    	throw re;
		    }
	    } finally {
	        this.exitRule();
	    }
	    return localctx;
	}



	group() {
	    let localctx = new GroupContext(this, this._ctx, this.state);
	    this.enterRule(localctx, 8, IsnowParser.RULE_group);
	    try {
	        this.state = 60;
	        this._errHandler.sync(this);
	        var la_ = this._interp.adaptivePredict(this._input,5,this._ctx);
	        switch(la_) {
	        case 1:
	            this.enterOuterAlt(localctx, 1);
	            this.state = 57;
	            this.dateGroup();
	            break;

	        case 2:
	            this.enterOuterAlt(localctx, 2);
	            this.state = 58;
	            this.timeGroup();
	            break;

	        case 3:
	            this.enterOuterAlt(localctx, 3);
	            this.state = 59;
	            this.bareGroup();
	            break;

	        }
	    } catch (re) {
	    	if(re instanceof antlr4.error.RecognitionException) {
		        localctx.exception = re;
		        this._errHandler.reportError(this, re);
		        this._errHandler.recover(this, re);
		    } else {
		    	throw re;
		    }
	    } finally {
	        this.exitRule();
	    }
	    return localctx;
	}



	dateGroup() {
	    let localctx = new DateGroupContext(this, this._ctx, this.state);
	    this.enterRule(localctx, 10, IsnowParser.RULE_dateGroup);
	    var _la = 0;
	    try {
	        this.enterOuterAlt(localctx, 1);
	        this.state = 63;
	        this._errHandler.sync(this);
	        _la = this._input.LA(1);
	        if((((_la) & ~0x1f) === 0 && ((1 << _la) & 52608) !== 0)) {
	            this.state = 62;
	            this.field();
	        }

	        this.state = 69; 
	        this._errHandler.sync(this);
	        _la = this._input.LA(1);
	        do {
	            this.state = 65;
	            this.match(IsnowParser.SLASH);
	            this.state = 67;
	            this._errHandler.sync(this);
	            _la = this._input.LA(1);
	            if((((_la) & ~0x1f) === 0 && ((1 << _la) & 52608) !== 0)) {
	                this.state = 66;
	                this.field();
	            }

	            this.state = 71; 
	            this._errHandler.sync(this);
	            _la = this._input.LA(1);
	        } while(_la===5);
	    } catch (re) {
	    	if(re instanceof antlr4.error.RecognitionException) {
		        localctx.exception = re;
		        this._errHandler.reportError(this, re);
		        this._errHandler.recover(this, re);
		    } else {
		    	throw re;
		    }
	    } finally {
	        this.exitRule();
	    }
	    return localctx;
	}



	timeGroup() {
	    let localctx = new TimeGroupContext(this, this._ctx, this.state);
	    this.enterRule(localctx, 12, IsnowParser.RULE_timeGroup);
	    var _la = 0;
	    try {
	        this.enterOuterAlt(localctx, 1);
	        this.state = 74;
	        this._errHandler.sync(this);
	        _la = this._input.LA(1);
	        if((((_la) & ~0x1f) === 0 && ((1 << _la) & 52608) !== 0)) {
	            this.state = 73;
	            this.field();
	        }

	        this.state = 80; 
	        this._errHandler.sync(this);
	        _la = this._input.LA(1);
	        do {
	            this.state = 76;
	            this.match(IsnowParser.COLON);
	            this.state = 78;
	            this._errHandler.sync(this);
	            _la = this._input.LA(1);
	            if((((_la) & ~0x1f) === 0 && ((1 << _la) & 52608) !== 0)) {
	                this.state = 77;
	                this.field();
	            }

	            this.state = 82; 
	            this._errHandler.sync(this);
	            _la = this._input.LA(1);
	        } while(_la===6);
	    } catch (re) {
	    	if(re instanceof antlr4.error.RecognitionException) {
		        localctx.exception = re;
		        this._errHandler.reportError(this, re);
		        this._errHandler.recover(this, re);
		    } else {
		    	throw re;
		    }
	    } finally {
	        this.exitRule();
	    }
	    return localctx;
	}



	bareGroup() {
	    let localctx = new BareGroupContext(this, this._ctx, this.state);
	    this.enterRule(localctx, 14, IsnowParser.RULE_bareGroup);
	    try {
	        this.enterOuterAlt(localctx, 1);
	        this.state = 84;
	        this.field();
	    } catch (re) {
	    	if(re instanceof antlr4.error.RecognitionException) {
		        localctx.exception = re;
		        this._errHandler.reportError(this, re);
		        this._errHandler.recover(this, re);
		    } else {
		    	throw re;
		    }
	    } finally {
	        this.exitRule();
	    }
	    return localctx;
	}



	field() {
	    let localctx = new FieldContext(this, this._ctx, this.state);
	    this.enterRule(localctx, 16, IsnowParser.RULE_field);
	    var _la = 0;
	    try {
	        this.enterOuterAlt(localctx, 1);
	        this.state = 87;
	        this._errHandler.sync(this);
	        _la = this._input.LA(1);
	        if(_la===8) {
	            this.state = 86;
	            this.match(IsnowParser.BANG);
	        }

	        this.state = 89;
	        this.term();
	        this.state = 94;
	        this._errHandler.sync(this);
	        _la = this._input.LA(1);
	        while(_la===9) {
	            this.state = 90;
	            this.match(IsnowParser.COMMA);
	            this.state = 91;
	            this.term();
	            this.state = 96;
	            this._errHandler.sync(this);
	            _la = this._input.LA(1);
	        }
	    } catch (re) {
	    	if(re instanceof antlr4.error.RecognitionException) {
		        localctx.exception = re;
		        this._errHandler.reportError(this, re);
		        this._errHandler.recover(this, re);
		    } else {
		    	throw re;
		    }
	    } finally {
	        this.exitRule();
	    }
	    return localctx;
	}



	term() {
	    let localctx = new TermContext(this, this._ctx, this.state);
	    this.enterRule(localctx, 18, IsnowParser.RULE_term);
	    var _la = 0;
	    try {
	        this.state = 109;
	        this._errHandler.sync(this);
	        var la_ = this._interp.adaptivePredict(this._input,17,this._ctx);
	        switch(la_) {
	        case 1:
	            this.enterOuterAlt(localctx, 1);
	            this.state = 98;
	            this._errHandler.sync(this);
	            _la = this._input.LA(1);
	            if(_la===10) {
	                this.state = 97;
	                this.match(IsnowParser.DASH);
	            }

	            this.state = 100;
	            this.atom();
	            this.state = 103;
	            this._errHandler.sync(this);
	            var la_ = this._interp.adaptivePredict(this._input,15,this._ctx);
	            if(la_===1) {
	                this.state = 101;
	                this.match(IsnowParser.DASH);
	                this.state = 102;
	                this.atom();

	            }
	            this.state = 106;
	            this._errHandler.sync(this);
	            _la = this._input.LA(1);
	            if(_la===10 || _la===11) {
	                this.state = 105;
	                this.incr();
	            }

	            break;

	        case 2:
	            this.enterOuterAlt(localctx, 2);
	            this.state = 108;
	            this.incr();
	            break;

	        }
	    } catch (re) {
	    	if(re instanceof antlr4.error.RecognitionException) {
		        localctx.exception = re;
		        this._errHandler.reportError(this, re);
		        this._errHandler.recover(this, re);
		    } else {
		    	throw re;
		    }
	    } finally {
	        this.exitRule();
	    }
	    return localctx;
	}



	incr() {
	    let localctx = new IncrContext(this, this._ctx, this.state);
	    this.enterRule(localctx, 20, IsnowParser.RULE_incr);
	    var _la = 0;
	    try {
	        this.state = 135;
	        this._errHandler.sync(this);
	        switch(this._input.LA(1)) {
	        case 11:
	            this.enterOuterAlt(localctx, 1);
	            this.state = 111;
	            this.match(IsnowParser.PLUS);
	            this.state = 112;
	            this.match(IsnowParser.LBRACK);
	            this.state = 113;
	            this.qty();
	            this.state = 118;
	            this._errHandler.sync(this);
	            _la = this._input.LA(1);
	            while(_la===9) {
	                this.state = 114;
	                this.match(IsnowParser.COMMA);
	                this.state = 115;
	                this.qty();
	                this.state = 120;
	                this._errHandler.sync(this);
	                _la = this._input.LA(1);
	            }
	            this.state = 121;
	            this.match(IsnowParser.RBRACK);
	            break;
	        case 10:
	            this.enterOuterAlt(localctx, 2);
	            this.state = 123;
	            this.match(IsnowParser.DASH);
	            this.state = 124;
	            this.match(IsnowParser.LBRACK);
	            this.state = 125;
	            this.qty();
	            this.state = 130;
	            this._errHandler.sync(this);
	            _la = this._input.LA(1);
	            while(_la===9) {
	                this.state = 126;
	                this.match(IsnowParser.COMMA);
	                this.state = 127;
	                this.qty();
	                this.state = 132;
	                this._errHandler.sync(this);
	                _la = this._input.LA(1);
	            }
	            this.state = 133;
	            this.match(IsnowParser.RBRACK);
	            break;
	        default:
	            throw new antlr4.error.NoViableAltException(this);
	        }
	    } catch (re) {
	    	if(re instanceof antlr4.error.RecognitionException) {
		        localctx.exception = re;
		        this._errHandler.reportError(this, re);
		        this._errHandler.recover(this, re);
		    } else {
		    	throw re;
		    }
	    } finally {
	        this.exitRule();
	    }
	    return localctx;
	}



	atom() {
	    let localctx = new AtomContext(this, this._ctx, this.state);
	    this.enterRule(localctx, 22, IsnowParser.RULE_atom);
	    var _la = 0;
	    try {
	        this.state = 144;
	        this._errHandler.sync(this);
	        switch(this._input.LA(1)) {
	        case 7:
	            this.enterOuterAlt(localctx, 1);
	            this.state = 137;
	            this.match(IsnowParser.STAR);
	            break;
	        case 15:
	            this.enterOuterAlt(localctx, 2);
	            this.state = 138;
	            this.match(IsnowParser.NAME);
	            break;
	        case 14:
	            this.enterOuterAlt(localctx, 3);
	            this.state = 140; 
	            this._errHandler.sync(this);
	            _la = this._input.LA(1);
	            do {
	                this.state = 139;
	                this.qty();
	                this.state = 142; 
	                this._errHandler.sync(this);
	                _la = this._input.LA(1);
	            } while(_la===14);
	            break;
	        default:
	            throw new antlr4.error.NoViableAltException(this);
	        }
	    } catch (re) {
	    	if(re instanceof antlr4.error.RecognitionException) {
		        localctx.exception = re;
		        this._errHandler.reportError(this, re);
		        this._errHandler.recover(this, re);
		    } else {
		    	throw re;
		    }
	    } finally {
	        this.exitRule();
	    }
	    return localctx;
	}



	qty() {
	    let localctx = new QtyContext(this, this._ctx, this.state);
	    this.enterRule(localctx, 24, IsnowParser.RULE_qty);
	    var _la = 0;
	    try {
	        this.enterOuterAlt(localctx, 1);
	        this.state = 146;
	        this.match(IsnowParser.NUMBER);
	        this.state = 148;
	        this._errHandler.sync(this);
	        _la = this._input.LA(1);
	        if(_la===15) {
	            this.state = 147;
	            this.match(IsnowParser.NAME);
	        }

	    } catch (re) {
	    	if(re instanceof antlr4.error.RecognitionException) {
		        localctx.exception = re;
		        this._errHandler.reportError(this, re);
		        this._errHandler.recover(this, re);
		    } else {
		    	throw re;
		    }
	    } finally {
	        this.exitRule();
	    }
	    return localctx;
	}


}

IsnowParser.EOF = antlr4.Token.EOF;
IsnowParser.GE = 1;
IsnowParser.LE = 2;
IsnowParser.GT = 3;
IsnowParser.LT = 4;
IsnowParser.SLASH = 5;
IsnowParser.COLON = 6;
IsnowParser.STAR = 7;
IsnowParser.BANG = 8;
IsnowParser.COMMA = 9;
IsnowParser.DASH = 10;
IsnowParser.PLUS = 11;
IsnowParser.LBRACK = 12;
IsnowParser.RBRACK = 13;
IsnowParser.NUMBER = 14;
IsnowParser.NAME = 15;
IsnowParser.GSEP = 16;

IsnowParser.RULE_pattern = 0;
IsnowParser.RULE_bound = 1;
IsnowParser.RULE_boundOp = 2;
IsnowParser.RULE_spec = 3;
IsnowParser.RULE_group = 4;
IsnowParser.RULE_dateGroup = 5;
IsnowParser.RULE_timeGroup = 6;
IsnowParser.RULE_bareGroup = 7;
IsnowParser.RULE_field = 8;
IsnowParser.RULE_term = 9;
IsnowParser.RULE_incr = 10;
IsnowParser.RULE_atom = 11;
IsnowParser.RULE_qty = 12;

class PatternContext extends antlr4.ParserRuleContext {

    constructor(parser, parent, invokingState) {
        if(parent===undefined) {
            parent = null;
        }
        if(invokingState===undefined || invokingState===null) {
            invokingState = -1;
        }
        super(parent, invokingState);
        this.parser = parser;
        this.ruleIndex = IsnowParser.RULE_pattern;
    }

	spec() {
	    return this.getTypedRuleContext(SpecContext,0);
	};

	EOF() {
	    return this.getToken(IsnowParser.EOF, 0);
	};

	GSEP = function(i) {
		if(i===undefined) {
			i = null;
		}
	    if(i===null) {
	        return this.getTokens(IsnowParser.GSEP);
	    } else {
	        return this.getToken(IsnowParser.GSEP, i);
	    }
	};


	bound = function(i) {
	    if(i===undefined) {
	        i = null;
	    }
	    if(i===null) {
	        return this.getTypedRuleContexts(BoundContext);
	    } else {
	        return this.getTypedRuleContext(BoundContext,i);
	    }
	};

	enterRule(listener) {
	    if(listener instanceof IsnowParserListener ) {
	        listener.enterPattern(this);
		}
	}

	exitRule(listener) {
	    if(listener instanceof IsnowParserListener ) {
	        listener.exitPattern(this);
		}
	}

	accept(visitor) {
	    if ( visitor instanceof IsnowParserVisitor ) {
	        return visitor.visitPattern(this);
	    } else {
	        return visitor.visitChildren(this);
	    }
	}


}



class BoundContext extends antlr4.ParserRuleContext {

    constructor(parser, parent, invokingState) {
        if(parent===undefined) {
            parent = null;
        }
        if(invokingState===undefined || invokingState===null) {
            invokingState = -1;
        }
        super(parent, invokingState);
        this.parser = parser;
        this.ruleIndex = IsnowParser.RULE_bound;
    }

	boundOp() {
	    return this.getTypedRuleContext(BoundOpContext,0);
	};

	spec() {
	    return this.getTypedRuleContext(SpecContext,0);
	};

	GSEP() {
	    return this.getToken(IsnowParser.GSEP, 0);
	};

	enterRule(listener) {
	    if(listener instanceof IsnowParserListener ) {
	        listener.enterBound(this);
		}
	}

	exitRule(listener) {
	    if(listener instanceof IsnowParserListener ) {
	        listener.exitBound(this);
		}
	}

	accept(visitor) {
	    if ( visitor instanceof IsnowParserVisitor ) {
	        return visitor.visitBound(this);
	    } else {
	        return visitor.visitChildren(this);
	    }
	}


}



class BoundOpContext extends antlr4.ParserRuleContext {

    constructor(parser, parent, invokingState) {
        if(parent===undefined) {
            parent = null;
        }
        if(invokingState===undefined || invokingState===null) {
            invokingState = -1;
        }
        super(parent, invokingState);
        this.parser = parser;
        this.ruleIndex = IsnowParser.RULE_boundOp;
    }

	GE() {
	    return this.getToken(IsnowParser.GE, 0);
	};

	GT() {
	    return this.getToken(IsnowParser.GT, 0);
	};

	LE() {
	    return this.getToken(IsnowParser.LE, 0);
	};

	LT() {
	    return this.getToken(IsnowParser.LT, 0);
	};

	enterRule(listener) {
	    if(listener instanceof IsnowParserListener ) {
	        listener.enterBoundOp(this);
		}
	}

	exitRule(listener) {
	    if(listener instanceof IsnowParserListener ) {
	        listener.exitBoundOp(this);
		}
	}

	accept(visitor) {
	    if ( visitor instanceof IsnowParserVisitor ) {
	        return visitor.visitBoundOp(this);
	    } else {
	        return visitor.visitChildren(this);
	    }
	}


}



class SpecContext extends antlr4.ParserRuleContext {

    constructor(parser, parent, invokingState) {
        if(parent===undefined) {
            parent = null;
        }
        if(invokingState===undefined || invokingState===null) {
            invokingState = -1;
        }
        super(parent, invokingState);
        this.parser = parser;
        this.ruleIndex = IsnowParser.RULE_spec;
    }

	group = function(i) {
	    if(i===undefined) {
	        i = null;
	    }
	    if(i===null) {
	        return this.getTypedRuleContexts(GroupContext);
	    } else {
	        return this.getTypedRuleContext(GroupContext,i);
	    }
	};

	GSEP = function(i) {
		if(i===undefined) {
			i = null;
		}
	    if(i===null) {
	        return this.getTokens(IsnowParser.GSEP);
	    } else {
	        return this.getToken(IsnowParser.GSEP, i);
	    }
	};


	enterRule(listener) {
	    if(listener instanceof IsnowParserListener ) {
	        listener.enterSpec(this);
		}
	}

	exitRule(listener) {
	    if(listener instanceof IsnowParserListener ) {
	        listener.exitSpec(this);
		}
	}

	accept(visitor) {
	    if ( visitor instanceof IsnowParserVisitor ) {
	        return visitor.visitSpec(this);
	    } else {
	        return visitor.visitChildren(this);
	    }
	}


}



class GroupContext extends antlr4.ParserRuleContext {

    constructor(parser, parent, invokingState) {
        if(parent===undefined) {
            parent = null;
        }
        if(invokingState===undefined || invokingState===null) {
            invokingState = -1;
        }
        super(parent, invokingState);
        this.parser = parser;
        this.ruleIndex = IsnowParser.RULE_group;
    }

	dateGroup() {
	    return this.getTypedRuleContext(DateGroupContext,0);
	};

	timeGroup() {
	    return this.getTypedRuleContext(TimeGroupContext,0);
	};

	bareGroup() {
	    return this.getTypedRuleContext(BareGroupContext,0);
	};

	enterRule(listener) {
	    if(listener instanceof IsnowParserListener ) {
	        listener.enterGroup(this);
		}
	}

	exitRule(listener) {
	    if(listener instanceof IsnowParserListener ) {
	        listener.exitGroup(this);
		}
	}

	accept(visitor) {
	    if ( visitor instanceof IsnowParserVisitor ) {
	        return visitor.visitGroup(this);
	    } else {
	        return visitor.visitChildren(this);
	    }
	}


}



class DateGroupContext extends antlr4.ParserRuleContext {

    constructor(parser, parent, invokingState) {
        if(parent===undefined) {
            parent = null;
        }
        if(invokingState===undefined || invokingState===null) {
            invokingState = -1;
        }
        super(parent, invokingState);
        this.parser = parser;
        this.ruleIndex = IsnowParser.RULE_dateGroup;
    }

	field = function(i) {
	    if(i===undefined) {
	        i = null;
	    }
	    if(i===null) {
	        return this.getTypedRuleContexts(FieldContext);
	    } else {
	        return this.getTypedRuleContext(FieldContext,i);
	    }
	};

	SLASH = function(i) {
		if(i===undefined) {
			i = null;
		}
	    if(i===null) {
	        return this.getTokens(IsnowParser.SLASH);
	    } else {
	        return this.getToken(IsnowParser.SLASH, i);
	    }
	};


	enterRule(listener) {
	    if(listener instanceof IsnowParserListener ) {
	        listener.enterDateGroup(this);
		}
	}

	exitRule(listener) {
	    if(listener instanceof IsnowParserListener ) {
	        listener.exitDateGroup(this);
		}
	}

	accept(visitor) {
	    if ( visitor instanceof IsnowParserVisitor ) {
	        return visitor.visitDateGroup(this);
	    } else {
	        return visitor.visitChildren(this);
	    }
	}


}



class TimeGroupContext extends antlr4.ParserRuleContext {

    constructor(parser, parent, invokingState) {
        if(parent===undefined) {
            parent = null;
        }
        if(invokingState===undefined || invokingState===null) {
            invokingState = -1;
        }
        super(parent, invokingState);
        this.parser = parser;
        this.ruleIndex = IsnowParser.RULE_timeGroup;
    }

	field = function(i) {
	    if(i===undefined) {
	        i = null;
	    }
	    if(i===null) {
	        return this.getTypedRuleContexts(FieldContext);
	    } else {
	        return this.getTypedRuleContext(FieldContext,i);
	    }
	};

	COLON = function(i) {
		if(i===undefined) {
			i = null;
		}
	    if(i===null) {
	        return this.getTokens(IsnowParser.COLON);
	    } else {
	        return this.getToken(IsnowParser.COLON, i);
	    }
	};


	enterRule(listener) {
	    if(listener instanceof IsnowParserListener ) {
	        listener.enterTimeGroup(this);
		}
	}

	exitRule(listener) {
	    if(listener instanceof IsnowParserListener ) {
	        listener.exitTimeGroup(this);
		}
	}

	accept(visitor) {
	    if ( visitor instanceof IsnowParserVisitor ) {
	        return visitor.visitTimeGroup(this);
	    } else {
	        return visitor.visitChildren(this);
	    }
	}


}



class BareGroupContext extends antlr4.ParserRuleContext {

    constructor(parser, parent, invokingState) {
        if(parent===undefined) {
            parent = null;
        }
        if(invokingState===undefined || invokingState===null) {
            invokingState = -1;
        }
        super(parent, invokingState);
        this.parser = parser;
        this.ruleIndex = IsnowParser.RULE_bareGroup;
    }

	field() {
	    return this.getTypedRuleContext(FieldContext,0);
	};

	enterRule(listener) {
	    if(listener instanceof IsnowParserListener ) {
	        listener.enterBareGroup(this);
		}
	}

	exitRule(listener) {
	    if(listener instanceof IsnowParserListener ) {
	        listener.exitBareGroup(this);
		}
	}

	accept(visitor) {
	    if ( visitor instanceof IsnowParserVisitor ) {
	        return visitor.visitBareGroup(this);
	    } else {
	        return visitor.visitChildren(this);
	    }
	}


}



class FieldContext extends antlr4.ParserRuleContext {

    constructor(parser, parent, invokingState) {
        if(parent===undefined) {
            parent = null;
        }
        if(invokingState===undefined || invokingState===null) {
            invokingState = -1;
        }
        super(parent, invokingState);
        this.parser = parser;
        this.ruleIndex = IsnowParser.RULE_field;
    }

	term = function(i) {
	    if(i===undefined) {
	        i = null;
	    }
	    if(i===null) {
	        return this.getTypedRuleContexts(TermContext);
	    } else {
	        return this.getTypedRuleContext(TermContext,i);
	    }
	};

	BANG() {
	    return this.getToken(IsnowParser.BANG, 0);
	};

	COMMA = function(i) {
		if(i===undefined) {
			i = null;
		}
	    if(i===null) {
	        return this.getTokens(IsnowParser.COMMA);
	    } else {
	        return this.getToken(IsnowParser.COMMA, i);
	    }
	};


	enterRule(listener) {
	    if(listener instanceof IsnowParserListener ) {
	        listener.enterField(this);
		}
	}

	exitRule(listener) {
	    if(listener instanceof IsnowParserListener ) {
	        listener.exitField(this);
		}
	}

	accept(visitor) {
	    if ( visitor instanceof IsnowParserVisitor ) {
	        return visitor.visitField(this);
	    } else {
	        return visitor.visitChildren(this);
	    }
	}


}



class TermContext extends antlr4.ParserRuleContext {

    constructor(parser, parent, invokingState) {
        if(parent===undefined) {
            parent = null;
        }
        if(invokingState===undefined || invokingState===null) {
            invokingState = -1;
        }
        super(parent, invokingState);
        this.parser = parser;
        this.ruleIndex = IsnowParser.RULE_term;
    }

	atom = function(i) {
	    if(i===undefined) {
	        i = null;
	    }
	    if(i===null) {
	        return this.getTypedRuleContexts(AtomContext);
	    } else {
	        return this.getTypedRuleContext(AtomContext,i);
	    }
	};

	DASH = function(i) {
		if(i===undefined) {
			i = null;
		}
	    if(i===null) {
	        return this.getTokens(IsnowParser.DASH);
	    } else {
	        return this.getToken(IsnowParser.DASH, i);
	    }
	};


	incr() {
	    return this.getTypedRuleContext(IncrContext,0);
	};

	enterRule(listener) {
	    if(listener instanceof IsnowParserListener ) {
	        listener.enterTerm(this);
		}
	}

	exitRule(listener) {
	    if(listener instanceof IsnowParserListener ) {
	        listener.exitTerm(this);
		}
	}

	accept(visitor) {
	    if ( visitor instanceof IsnowParserVisitor ) {
	        return visitor.visitTerm(this);
	    } else {
	        return visitor.visitChildren(this);
	    }
	}


}



class IncrContext extends antlr4.ParserRuleContext {

    constructor(parser, parent, invokingState) {
        if(parent===undefined) {
            parent = null;
        }
        if(invokingState===undefined || invokingState===null) {
            invokingState = -1;
        }
        super(parent, invokingState);
        this.parser = parser;
        this.ruleIndex = IsnowParser.RULE_incr;
    }

	PLUS() {
	    return this.getToken(IsnowParser.PLUS, 0);
	};

	LBRACK() {
	    return this.getToken(IsnowParser.LBRACK, 0);
	};

	qty = function(i) {
	    if(i===undefined) {
	        i = null;
	    }
	    if(i===null) {
	        return this.getTypedRuleContexts(QtyContext);
	    } else {
	        return this.getTypedRuleContext(QtyContext,i);
	    }
	};

	RBRACK() {
	    return this.getToken(IsnowParser.RBRACK, 0);
	};

	COMMA = function(i) {
		if(i===undefined) {
			i = null;
		}
	    if(i===null) {
	        return this.getTokens(IsnowParser.COMMA);
	    } else {
	        return this.getToken(IsnowParser.COMMA, i);
	    }
	};


	DASH() {
	    return this.getToken(IsnowParser.DASH, 0);
	};

	enterRule(listener) {
	    if(listener instanceof IsnowParserListener ) {
	        listener.enterIncr(this);
		}
	}

	exitRule(listener) {
	    if(listener instanceof IsnowParserListener ) {
	        listener.exitIncr(this);
		}
	}

	accept(visitor) {
	    if ( visitor instanceof IsnowParserVisitor ) {
	        return visitor.visitIncr(this);
	    } else {
	        return visitor.visitChildren(this);
	    }
	}


}



class AtomContext extends antlr4.ParserRuleContext {

    constructor(parser, parent, invokingState) {
        if(parent===undefined) {
            parent = null;
        }
        if(invokingState===undefined || invokingState===null) {
            invokingState = -1;
        }
        super(parent, invokingState);
        this.parser = parser;
        this.ruleIndex = IsnowParser.RULE_atom;
    }

	STAR() {
	    return this.getToken(IsnowParser.STAR, 0);
	};

	NAME() {
	    return this.getToken(IsnowParser.NAME, 0);
	};

	qty = function(i) {
	    if(i===undefined) {
	        i = null;
	    }
	    if(i===null) {
	        return this.getTypedRuleContexts(QtyContext);
	    } else {
	        return this.getTypedRuleContext(QtyContext,i);
	    }
	};

	enterRule(listener) {
	    if(listener instanceof IsnowParserListener ) {
	        listener.enterAtom(this);
		}
	}

	exitRule(listener) {
	    if(listener instanceof IsnowParserListener ) {
	        listener.exitAtom(this);
		}
	}

	accept(visitor) {
	    if ( visitor instanceof IsnowParserVisitor ) {
	        return visitor.visitAtom(this);
	    } else {
	        return visitor.visitChildren(this);
	    }
	}


}



class QtyContext extends antlr4.ParserRuleContext {

    constructor(parser, parent, invokingState) {
        if(parent===undefined) {
            parent = null;
        }
        if(invokingState===undefined || invokingState===null) {
            invokingState = -1;
        }
        super(parent, invokingState);
        this.parser = parser;
        this.ruleIndex = IsnowParser.RULE_qty;
    }

	NUMBER() {
	    return this.getToken(IsnowParser.NUMBER, 0);
	};

	NAME() {
	    return this.getToken(IsnowParser.NAME, 0);
	};

	enterRule(listener) {
	    if(listener instanceof IsnowParserListener ) {
	        listener.enterQty(this);
		}
	}

	exitRule(listener) {
	    if(listener instanceof IsnowParserListener ) {
	        listener.exitQty(this);
		}
	}

	accept(visitor) {
	    if ( visitor instanceof IsnowParserVisitor ) {
	        return visitor.visitQty(this);
	    } else {
	        return visitor.visitChildren(this);
	    }
	}


}




IsnowParser.PatternContext = PatternContext; 
IsnowParser.BoundContext = BoundContext; 
IsnowParser.BoundOpContext = BoundOpContext; 
IsnowParser.SpecContext = SpecContext; 
IsnowParser.GroupContext = GroupContext; 
IsnowParser.DateGroupContext = DateGroupContext; 
IsnowParser.TimeGroupContext = TimeGroupContext; 
IsnowParser.BareGroupContext = BareGroupContext; 
IsnowParser.FieldContext = FieldContext; 
IsnowParser.TermContext = TermContext; 
IsnowParser.IncrContext = IncrContext; 
IsnowParser.AtomContext = AtomContext; 
IsnowParser.QtyContext = QtyContext; 
