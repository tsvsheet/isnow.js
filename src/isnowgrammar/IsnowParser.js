// Generated from IsnowParser.g4 by ANTLR 4.13.2
// jshint ignore: start
import antlr4 from "antlr4";
import IsnowParserListener from "./IsnowParserListener.js";
import IsnowParserVisitor from "./IsnowParserVisitor.js";

const serializedATN = [
	4, 1, 16, 159, 2, 0, 7, 0, 2, 1, 7, 1, 2, 2, 7, 2, 2, 3, 7, 3, 2, 4, 7, 4, 2,
	5, 7, 5, 2, 6, 7, 6, 2, 7, 7, 7, 2, 8, 7, 8, 2, 9, 7, 9, 2, 10, 7, 10, 2, 11,
	7, 11, 2, 12, 7, 12, 2, 13, 7, 13, 1, 0, 3, 0, 30, 8, 0, 1, 0, 1, 0, 1, 0, 5,
	0, 35, 8, 0, 10, 0, 12, 0, 38, 9, 0, 1, 0, 3, 0, 41, 8, 0, 1, 0, 1, 0, 1, 1,
	3, 1, 46, 8, 1, 1, 1, 1, 1, 1, 1, 1, 2, 1, 2, 1, 3, 1, 3, 1, 3, 1, 3, 1, 3, 1,
	4, 1, 4, 1, 4, 5, 4, 61, 8, 4, 10, 4, 12, 4, 64, 9, 4, 1, 5, 1, 5, 1, 5, 3, 5,
	69, 8, 5, 1, 6, 3, 6, 72, 8, 6, 1, 6, 1, 6, 3, 6, 76, 8, 6, 4, 6, 78, 8, 6,
	11, 6, 12, 6, 79, 1, 7, 3, 7, 83, 8, 7, 1, 7, 1, 7, 3, 7, 87, 8, 7, 4, 7, 89,
	8, 7, 11, 7, 12, 7, 90, 1, 8, 1, 8, 1, 9, 3, 9, 96, 8, 9, 1, 9, 1, 9, 1, 9, 5,
	9, 101, 8, 9, 10, 9, 12, 9, 104, 9, 9, 1, 10, 3, 10, 107, 8, 10, 1, 10, 1, 10,
	1, 10, 3, 10, 112, 8, 10, 1, 10, 3, 10, 115, 8, 10, 1, 10, 3, 10, 118, 8, 10,
	1, 11, 1, 11, 1, 11, 1, 11, 1, 11, 5, 11, 125, 8, 11, 10, 11, 12, 11, 128, 9,
	11, 1, 11, 1, 11, 1, 11, 1, 11, 1, 11, 1, 11, 1, 11, 5, 11, 137, 8, 11, 10,
	11, 12, 11, 140, 9, 11, 1, 11, 1, 11, 3, 11, 144, 8, 11, 1, 12, 1, 12, 1, 12,
	4, 12, 149, 8, 12, 11, 12, 12, 12, 150, 3, 12, 153, 8, 12, 1, 13, 1, 13, 3,
	13, 157, 8, 13, 1, 13, 0, 0, 14, 0, 2, 4, 6, 8, 10, 12, 14, 16, 18, 20, 22,
	24, 26, 0, 1, 1, 0, 1, 4, 171, 0, 29, 1, 0, 0, 0, 2, 45, 1, 0, 0, 0, 4, 50, 1,
	0, 0, 0, 6, 52, 1, 0, 0, 0, 8, 57, 1, 0, 0, 0, 10, 68, 1, 0, 0, 0, 12, 71, 1,
	0, 0, 0, 14, 82, 1, 0, 0, 0, 16, 92, 1, 0, 0, 0, 18, 95, 1, 0, 0, 0, 20, 117,
	1, 0, 0, 0, 22, 143, 1, 0, 0, 0, 24, 152, 1, 0, 0, 0, 26, 154, 1, 0, 0, 0, 28,
	30, 5, 16, 0, 0, 29, 28, 1, 0, 0, 0, 29, 30, 1, 0, 0, 0, 30, 31, 1, 0, 0, 0,
	31, 36, 3, 8, 4, 0, 32, 35, 3, 2, 1, 0, 33, 35, 3, 6, 3, 0, 34, 32, 1, 0, 0,
	0, 34, 33, 1, 0, 0, 0, 35, 38, 1, 0, 0, 0, 36, 34, 1, 0, 0, 0, 36, 37, 1, 0,
	0, 0, 37, 40, 1, 0, 0, 0, 38, 36, 1, 0, 0, 0, 39, 41, 5, 16, 0, 0, 40, 39, 1,
	0, 0, 0, 40, 41, 1, 0, 0, 0, 41, 42, 1, 0, 0, 0, 42, 43, 5, 0, 0, 1, 43, 1, 1,
	0, 0, 0, 44, 46, 5, 16, 0, 0, 45, 44, 1, 0, 0, 0, 45, 46, 1, 0, 0, 0, 46, 47,
	1, 0, 0, 0, 47, 48, 3, 4, 2, 0, 48, 49, 3, 8, 4, 0, 49, 3, 1, 0, 0, 0, 50, 51,
	7, 0, 0, 0, 51, 5, 1, 0, 0, 0, 52, 53, 5, 16, 0, 0, 53, 54, 5, 8, 0, 0, 54,
	55, 5, 16, 0, 0, 55, 56, 3, 8, 4, 0, 56, 7, 1, 0, 0, 0, 57, 62, 3, 10, 5, 0,
	58, 59, 5, 16, 0, 0, 59, 61, 3, 10, 5, 0, 60, 58, 1, 0, 0, 0, 61, 64, 1, 0, 0,
	0, 62, 60, 1, 0, 0, 0, 62, 63, 1, 0, 0, 0, 63, 9, 1, 0, 0, 0, 64, 62, 1, 0, 0,
	0, 65, 69, 3, 12, 6, 0, 66, 69, 3, 14, 7, 0, 67, 69, 3, 16, 8, 0, 68, 65, 1,
	0, 0, 0, 68, 66, 1, 0, 0, 0, 68, 67, 1, 0, 0, 0, 69, 11, 1, 0, 0, 0, 70, 72,
	3, 18, 9, 0, 71, 70, 1, 0, 0, 0, 71, 72, 1, 0, 0, 0, 72, 77, 1, 0, 0, 0, 73,
	75, 5, 5, 0, 0, 74, 76, 3, 18, 9, 0, 75, 74, 1, 0, 0, 0, 75, 76, 1, 0, 0, 0,
	76, 78, 1, 0, 0, 0, 77, 73, 1, 0, 0, 0, 78, 79, 1, 0, 0, 0, 79, 77, 1, 0, 0,
	0, 79, 80, 1, 0, 0, 0, 80, 13, 1, 0, 0, 0, 81, 83, 3, 18, 9, 0, 82, 81, 1, 0,
	0, 0, 82, 83, 1, 0, 0, 0, 83, 88, 1, 0, 0, 0, 84, 86, 5, 6, 0, 0, 85, 87, 3,
	18, 9, 0, 86, 85, 1, 0, 0, 0, 86, 87, 1, 0, 0, 0, 87, 89, 1, 0, 0, 0, 88, 84,
	1, 0, 0, 0, 89, 90, 1, 0, 0, 0, 90, 88, 1, 0, 0, 0, 90, 91, 1, 0, 0, 0, 91,
	15, 1, 0, 0, 0, 92, 93, 3, 18, 9, 0, 93, 17, 1, 0, 0, 0, 94, 96, 5, 8, 0, 0,
	95, 94, 1, 0, 0, 0, 95, 96, 1, 0, 0, 0, 96, 97, 1, 0, 0, 0, 97, 102, 3, 20,
	10, 0, 98, 99, 5, 9, 0, 0, 99, 101, 3, 20, 10, 0, 100, 98, 1, 0, 0, 0, 101,
	104, 1, 0, 0, 0, 102, 100, 1, 0, 0, 0, 102, 103, 1, 0, 0, 0, 103, 19, 1, 0, 0,
	0, 104, 102, 1, 0, 0, 0, 105, 107, 5, 10, 0, 0, 106, 105, 1, 0, 0, 0, 106,
	107, 1, 0, 0, 0, 107, 108, 1, 0, 0, 0, 108, 111, 3, 24, 12, 0, 109, 110, 5,
	10, 0, 0, 110, 112, 3, 24, 12, 0, 111, 109, 1, 0, 0, 0, 111, 112, 1, 0, 0, 0,
	112, 114, 1, 0, 0, 0, 113, 115, 3, 22, 11, 0, 114, 113, 1, 0, 0, 0, 114, 115,
	1, 0, 0, 0, 115, 118, 1, 0, 0, 0, 116, 118, 3, 22, 11, 0, 117, 106, 1, 0, 0,
	0, 117, 116, 1, 0, 0, 0, 118, 21, 1, 0, 0, 0, 119, 120, 5, 11, 0, 0, 120, 121,
	5, 12, 0, 0, 121, 126, 3, 26, 13, 0, 122, 123, 5, 9, 0, 0, 123, 125, 3, 26,
	13, 0, 124, 122, 1, 0, 0, 0, 125, 128, 1, 0, 0, 0, 126, 124, 1, 0, 0, 0, 126,
	127, 1, 0, 0, 0, 127, 129, 1, 0, 0, 0, 128, 126, 1, 0, 0, 0, 129, 130, 5, 13,
	0, 0, 130, 144, 1, 0, 0, 0, 131, 132, 5, 10, 0, 0, 132, 133, 5, 12, 0, 0, 133,
	138, 3, 26, 13, 0, 134, 135, 5, 9, 0, 0, 135, 137, 3, 26, 13, 0, 136, 134, 1,
	0, 0, 0, 137, 140, 1, 0, 0, 0, 138, 136, 1, 0, 0, 0, 138, 139, 1, 0, 0, 0,
	139, 141, 1, 0, 0, 0, 140, 138, 1, 0, 0, 0, 141, 142, 5, 13, 0, 0, 142, 144,
	1, 0, 0, 0, 143, 119, 1, 0, 0, 0, 143, 131, 1, 0, 0, 0, 144, 23, 1, 0, 0, 0,
	145, 153, 5, 7, 0, 0, 146, 153, 5, 15, 0, 0, 147, 149, 3, 26, 13, 0, 148, 147,
	1, 0, 0, 0, 149, 150, 1, 0, 0, 0, 150, 148, 1, 0, 0, 0, 150, 151, 1, 0, 0, 0,
	151, 153, 1, 0, 0, 0, 152, 145, 1, 0, 0, 0, 152, 146, 1, 0, 0, 0, 152, 148, 1,
	0, 0, 0, 153, 25, 1, 0, 0, 0, 154, 156, 5, 14, 0, 0, 155, 157, 5, 15, 0, 0,
	156, 155, 1, 0, 0, 0, 156, 157, 1, 0, 0, 0, 157, 27, 1, 0, 0, 0, 25, 29, 34,
	36, 40, 45, 62, 68, 71, 75, 79, 82, 86, 90, 95, 102, 106, 111, 114, 117, 126,
	138, 143, 150, 152, 156,
];

const atn = new antlr4.atn.ATNDeserializer().deserialize(serializedATN);

const decisionsToDFA = atn.decisionToState.map(
	(ds, index) => new antlr4.dfa.DFA(ds, index),
);

const sharedContextCache = new antlr4.atn.PredictionContextCache();

export default class IsnowParser extends antlr4.Parser {
	static grammarFileName = "IsnowParser.g4";
	static literalNames = [
		null,
		"'>='",
		"'<='",
		"'>'",
		"'<'",
		"'/'",
		"':'",
		"'*'",
		"'!'",
		"','",
		"'-'",
		"'+'",
		"'['",
		"']'",
	];
	static symbolicNames = [
		null,
		"GE",
		"LE",
		"GT",
		"LT",
		"SLASH",
		"COLON",
		"STAR",
		"BANG",
		"COMMA",
		"DASH",
		"PLUS",
		"LBRACK",
		"RBRACK",
		"NUMBER",
		"NAME",
		"GSEP",
	];
	static ruleNames = [
		"pattern",
		"bound",
		"boundOp",
		"exclusion",
		"spec",
		"group",
		"dateGroup",
		"timeGroup",
		"bareGroup",
		"field",
		"term",
		"incr",
		"atom",
		"qty",
	];

	constructor(input) {
		super(input);
		this._interp = new antlr4.atn.ParserATNSimulator(
			this,
			atn,
			decisionsToDFA,
			sharedContextCache,
		);
		this.ruleNames = IsnowParser.ruleNames;
		this.literalNames = IsnowParser.literalNames;
		this.symbolicNames = IsnowParser.symbolicNames;
	}

	pattern() {
		const localctx = new PatternContext(this, this._ctx, this.state);
		this.enterRule(localctx, 0, IsnowParser.RULE_pattern);
		var _la = 0;
		try {
			this.enterOuterAlt(localctx, 1);
			this.state = 29;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la === 16) {
				this.state = 28;
				this.match(IsnowParser.GSEP);
			}

			this.state = 31;
			this.spec();
			this.state = 36;
			this._errHandler.sync(this);
			var _alt = this._interp.adaptivePredict(this._input, 2, this._ctx);
			while (_alt != 2 && _alt != antlr4.atn.ATN.INVALID_ALT_NUMBER) {
				if (_alt === 1) {
					this.state = 34;
					this._errHandler.sync(this);
					var la_ = this._interp.adaptivePredict(this._input, 1, this._ctx);
					switch (la_) {
						case 1:
							this.state = 32;
							this.bound();
							break;

						case 2:
							this.state = 33;
							this.exclusion();
							break;
					}
				}
				this.state = 38;
				this._errHandler.sync(this);
				_alt = this._interp.adaptivePredict(this._input, 2, this._ctx);
			}

			this.state = 40;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la === 16) {
				this.state = 39;
				this.match(IsnowParser.GSEP);
			}

			this.state = 42;
			this.match(IsnowParser.EOF);
		} catch (re) {
			if (re instanceof antlr4.error.RecognitionException) {
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
		const localctx = new BoundContext(this, this._ctx, this.state);
		this.enterRule(localctx, 2, IsnowParser.RULE_bound);
		var _la = 0;
		try {
			this.enterOuterAlt(localctx, 1);
			this.state = 45;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la === 16) {
				this.state = 44;
				this.match(IsnowParser.GSEP);
			}

			this.state = 47;
			this.boundOp();
			this.state = 48;
			this.spec();
		} catch (re) {
			if (re instanceof antlr4.error.RecognitionException) {
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
		const localctx = new BoundOpContext(this, this._ctx, this.state);
		this.enterRule(localctx, 4, IsnowParser.RULE_boundOp);
		var _la = 0;
		try {
			this.enterOuterAlt(localctx, 1);
			this.state = 50;
			_la = this._input.LA(1);
			if (!((_la & ~0x1f) === 0 && ((1 << _la) & 30) !== 0)) {
				this._errHandler.recoverInline(this);
			} else {
				this._errHandler.reportMatch(this);
				this.consume();
			}
		} catch (re) {
			if (re instanceof antlr4.error.RecognitionException) {
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

	exclusion() {
		const localctx = new ExclusionContext(this, this._ctx, this.state);
		this.enterRule(localctx, 6, IsnowParser.RULE_exclusion);
		try {
			this.enterOuterAlt(localctx, 1);
			this.state = 52;
			this.match(IsnowParser.GSEP);
			this.state = 53;
			this.match(IsnowParser.BANG);
			this.state = 54;
			this.match(IsnowParser.GSEP);
			this.state = 55;
			this.spec();
		} catch (re) {
			if (re instanceof antlr4.error.RecognitionException) {
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
		const localctx = new SpecContext(this, this._ctx, this.state);
		this.enterRule(localctx, 8, IsnowParser.RULE_spec);
		try {
			this.enterOuterAlt(localctx, 1);
			this.state = 57;
			this.group();
			this.state = 62;
			this._errHandler.sync(this);
			var _alt = this._interp.adaptivePredict(this._input, 5, this._ctx);
			while (_alt != 2 && _alt != antlr4.atn.ATN.INVALID_ALT_NUMBER) {
				if (_alt === 1) {
					this.state = 58;
					this.match(IsnowParser.GSEP);
					this.state = 59;
					this.group();
				}
				this.state = 64;
				this._errHandler.sync(this);
				_alt = this._interp.adaptivePredict(this._input, 5, this._ctx);
			}
		} catch (re) {
			if (re instanceof antlr4.error.RecognitionException) {
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
		const localctx = new GroupContext(this, this._ctx, this.state);
		this.enterRule(localctx, 10, IsnowParser.RULE_group);
		try {
			this.state = 68;
			this._errHandler.sync(this);
			var la_ = this._interp.adaptivePredict(this._input, 6, this._ctx);
			switch (la_) {
				case 1:
					this.enterOuterAlt(localctx, 1);
					this.state = 65;
					this.dateGroup();
					break;

				case 2:
					this.enterOuterAlt(localctx, 2);
					this.state = 66;
					this.timeGroup();
					break;

				case 3:
					this.enterOuterAlt(localctx, 3);
					this.state = 67;
					this.bareGroup();
					break;
			}
		} catch (re) {
			if (re instanceof antlr4.error.RecognitionException) {
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
		const localctx = new DateGroupContext(this, this._ctx, this.state);
		this.enterRule(localctx, 12, IsnowParser.RULE_dateGroup);
		var _la = 0;
		try {
			this.enterOuterAlt(localctx, 1);
			this.state = 71;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if ((_la & ~0x1f) === 0 && ((1 << _la) & 52608) !== 0) {
				this.state = 70;
				this.field();
			}

			this.state = 77;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			do {
				this.state = 73;
				this.match(IsnowParser.SLASH);
				this.state = 75;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				if ((_la & ~0x1f) === 0 && ((1 << _la) & 52608) !== 0) {
					this.state = 74;
					this.field();
				}

				this.state = 79;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
			} while (_la === 5);
		} catch (re) {
			if (re instanceof antlr4.error.RecognitionException) {
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
		const localctx = new TimeGroupContext(this, this._ctx, this.state);
		this.enterRule(localctx, 14, IsnowParser.RULE_timeGroup);
		var _la = 0;
		try {
			this.enterOuterAlt(localctx, 1);
			this.state = 82;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if ((_la & ~0x1f) === 0 && ((1 << _la) & 52608) !== 0) {
				this.state = 81;
				this.field();
			}

			this.state = 88;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			do {
				this.state = 84;
				this.match(IsnowParser.COLON);
				this.state = 86;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				if ((_la & ~0x1f) === 0 && ((1 << _la) & 52608) !== 0) {
					this.state = 85;
					this.field();
				}

				this.state = 90;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
			} while (_la === 6);
		} catch (re) {
			if (re instanceof antlr4.error.RecognitionException) {
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
		const localctx = new BareGroupContext(this, this._ctx, this.state);
		this.enterRule(localctx, 16, IsnowParser.RULE_bareGroup);
		try {
			this.enterOuterAlt(localctx, 1);
			this.state = 92;
			this.field();
		} catch (re) {
			if (re instanceof antlr4.error.RecognitionException) {
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
		const localctx = new FieldContext(this, this._ctx, this.state);
		this.enterRule(localctx, 18, IsnowParser.RULE_field);
		var _la = 0;
		try {
			this.enterOuterAlt(localctx, 1);
			this.state = 95;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la === 8) {
				this.state = 94;
				this.match(IsnowParser.BANG);
			}

			this.state = 97;
			this.term();
			this.state = 102;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			while (_la === 9) {
				this.state = 98;
				this.match(IsnowParser.COMMA);
				this.state = 99;
				this.term();
				this.state = 104;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
			}
		} catch (re) {
			if (re instanceof antlr4.error.RecognitionException) {
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
		const localctx = new TermContext(this, this._ctx, this.state);
		this.enterRule(localctx, 20, IsnowParser.RULE_term);
		var _la = 0;
		try {
			this.state = 117;
			this._errHandler.sync(this);
			var la_ = this._interp.adaptivePredict(this._input, 18, this._ctx);
			switch (la_) {
				case 1: {
					this.enterOuterAlt(localctx, 1);
					this.state = 106;
					this._errHandler.sync(this);
					_la = this._input.LA(1);
					if (_la === 10) {
						this.state = 105;
						this.match(IsnowParser.DASH);
					}

					this.state = 108;
					this.atom();
					this.state = 111;
					this._errHandler.sync(this);
					var la_ = this._interp.adaptivePredict(this._input, 16, this._ctx);
					if (la_ === 1) {
						this.state = 109;
						this.match(IsnowParser.DASH);
						this.state = 110;
						this.atom();
					}
					this.state = 114;
					this._errHandler.sync(this);
					_la = this._input.LA(1);
					if (_la === 10 || _la === 11) {
						this.state = 113;
						this.incr();
					}

					break;
				}

				case 2:
					this.enterOuterAlt(localctx, 2);
					this.state = 116;
					this.incr();
					break;
			}
		} catch (re) {
			if (re instanceof antlr4.error.RecognitionException) {
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
		const localctx = new IncrContext(this, this._ctx, this.state);
		this.enterRule(localctx, 22, IsnowParser.RULE_incr);
		var _la = 0;
		try {
			this.state = 143;
			this._errHandler.sync(this);
			switch (this._input.LA(1)) {
				case 11:
					this.enterOuterAlt(localctx, 1);
					this.state = 119;
					this.match(IsnowParser.PLUS);
					this.state = 120;
					this.match(IsnowParser.LBRACK);
					this.state = 121;
					this.qty();
					this.state = 126;
					this._errHandler.sync(this);
					_la = this._input.LA(1);
					while (_la === 9) {
						this.state = 122;
						this.match(IsnowParser.COMMA);
						this.state = 123;
						this.qty();
						this.state = 128;
						this._errHandler.sync(this);
						_la = this._input.LA(1);
					}
					this.state = 129;
					this.match(IsnowParser.RBRACK);
					break;
				case 10:
					this.enterOuterAlt(localctx, 2);
					this.state = 131;
					this.match(IsnowParser.DASH);
					this.state = 132;
					this.match(IsnowParser.LBRACK);
					this.state = 133;
					this.qty();
					this.state = 138;
					this._errHandler.sync(this);
					_la = this._input.LA(1);
					while (_la === 9) {
						this.state = 134;
						this.match(IsnowParser.COMMA);
						this.state = 135;
						this.qty();
						this.state = 140;
						this._errHandler.sync(this);
						_la = this._input.LA(1);
					}
					this.state = 141;
					this.match(IsnowParser.RBRACK);
					break;
				default:
					throw new antlr4.error.NoViableAltException(this);
			}
		} catch (re) {
			if (re instanceof antlr4.error.RecognitionException) {
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
		const localctx = new AtomContext(this, this._ctx, this.state);
		this.enterRule(localctx, 24, IsnowParser.RULE_atom);
		var _la = 0;
		try {
			this.state = 152;
			this._errHandler.sync(this);
			switch (this._input.LA(1)) {
				case 7:
					this.enterOuterAlt(localctx, 1);
					this.state = 145;
					this.match(IsnowParser.STAR);
					break;
				case 15:
					this.enterOuterAlt(localctx, 2);
					this.state = 146;
					this.match(IsnowParser.NAME);
					break;
				case 14:
					this.enterOuterAlt(localctx, 3);
					this.state = 148;
					this._errHandler.sync(this);
					_la = this._input.LA(1);
					do {
						this.state = 147;
						this.qty();
						this.state = 150;
						this._errHandler.sync(this);
						_la = this._input.LA(1);
					} while (_la === 14);
					break;
				default:
					throw new antlr4.error.NoViableAltException(this);
			}
		} catch (re) {
			if (re instanceof antlr4.error.RecognitionException) {
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
		const localctx = new QtyContext(this, this._ctx, this.state);
		this.enterRule(localctx, 26, IsnowParser.RULE_qty);
		var _la = 0;
		try {
			this.enterOuterAlt(localctx, 1);
			this.state = 154;
			this.match(IsnowParser.NUMBER);
			this.state = 156;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la === 15) {
				this.state = 155;
				this.match(IsnowParser.NAME);
			}
		} catch (re) {
			if (re instanceof antlr4.error.RecognitionException) {
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
IsnowParser.RULE_exclusion = 3;
IsnowParser.RULE_spec = 4;
IsnowParser.RULE_group = 5;
IsnowParser.RULE_dateGroup = 6;
IsnowParser.RULE_timeGroup = 7;
IsnowParser.RULE_bareGroup = 8;
IsnowParser.RULE_field = 9;
IsnowParser.RULE_term = 10;
IsnowParser.RULE_incr = 11;
IsnowParser.RULE_atom = 12;
IsnowParser.RULE_qty = 13;

class PatternContext extends antlr4.ParserRuleContext {
	constructor(parser, parent, invokingState) {
		if (parent === undefined) {
			parent = null;
		}
		if (invokingState === undefined || invokingState === null) {
			invokingState = -1;
		}
		super(parent, invokingState);
		this.parser = parser;
		this.ruleIndex = IsnowParser.RULE_pattern;
	}

	spec() {
		return this.getTypedRuleContext(SpecContext, 0);
	}

	EOF() {
		return this.getToken(IsnowParser.EOF, 0);
	}

	GSEP = function (i) {
		if (i === undefined) {
			i = null;
		}
		if (i === null) {
			return this.getTokens(IsnowParser.GSEP);
		} else {
			return this.getToken(IsnowParser.GSEP, i);
		}
	};

	bound = function (i) {
		if (i === undefined) {
			i = null;
		}
		if (i === null) {
			return this.getTypedRuleContexts(BoundContext);
		} else {
			return this.getTypedRuleContext(BoundContext, i);
		}
	};

	exclusion = function (i) {
		if (i === undefined) {
			i = null;
		}
		if (i === null) {
			return this.getTypedRuleContexts(ExclusionContext);
		} else {
			return this.getTypedRuleContext(ExclusionContext, i);
		}
	};

	enterRule(listener) {
		if (listener instanceof IsnowParserListener) {
			listener.enterPattern(this);
		}
	}

	exitRule(listener) {
		if (listener instanceof IsnowParserListener) {
			listener.exitPattern(this);
		}
	}

	accept(visitor) {
		if (visitor instanceof IsnowParserVisitor) {
			return visitor.visitPattern(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}

class BoundContext extends antlr4.ParserRuleContext {
	constructor(parser, parent, invokingState) {
		if (parent === undefined) {
			parent = null;
		}
		if (invokingState === undefined || invokingState === null) {
			invokingState = -1;
		}
		super(parent, invokingState);
		this.parser = parser;
		this.ruleIndex = IsnowParser.RULE_bound;
	}

	boundOp() {
		return this.getTypedRuleContext(BoundOpContext, 0);
	}

	spec() {
		return this.getTypedRuleContext(SpecContext, 0);
	}

	GSEP() {
		return this.getToken(IsnowParser.GSEP, 0);
	}

	enterRule(listener) {
		if (listener instanceof IsnowParserListener) {
			listener.enterBound(this);
		}
	}

	exitRule(listener) {
		if (listener instanceof IsnowParserListener) {
			listener.exitBound(this);
		}
	}

	accept(visitor) {
		if (visitor instanceof IsnowParserVisitor) {
			return visitor.visitBound(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}

class BoundOpContext extends antlr4.ParserRuleContext {
	constructor(parser, parent, invokingState) {
		if (parent === undefined) {
			parent = null;
		}
		if (invokingState === undefined || invokingState === null) {
			invokingState = -1;
		}
		super(parent, invokingState);
		this.parser = parser;
		this.ruleIndex = IsnowParser.RULE_boundOp;
	}

	GE() {
		return this.getToken(IsnowParser.GE, 0);
	}

	GT() {
		return this.getToken(IsnowParser.GT, 0);
	}

	LE() {
		return this.getToken(IsnowParser.LE, 0);
	}

	LT() {
		return this.getToken(IsnowParser.LT, 0);
	}

	enterRule(listener) {
		if (listener instanceof IsnowParserListener) {
			listener.enterBoundOp(this);
		}
	}

	exitRule(listener) {
		if (listener instanceof IsnowParserListener) {
			listener.exitBoundOp(this);
		}
	}

	accept(visitor) {
		if (visitor instanceof IsnowParserVisitor) {
			return visitor.visitBoundOp(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}

class ExclusionContext extends antlr4.ParserRuleContext {
	constructor(parser, parent, invokingState) {
		if (parent === undefined) {
			parent = null;
		}
		if (invokingState === undefined || invokingState === null) {
			invokingState = -1;
		}
		super(parent, invokingState);
		this.parser = parser;
		this.ruleIndex = IsnowParser.RULE_exclusion;
	}

	GSEP = function (i) {
		if (i === undefined) {
			i = null;
		}
		if (i === null) {
			return this.getTokens(IsnowParser.GSEP);
		} else {
			return this.getToken(IsnowParser.GSEP, i);
		}
	};

	BANG() {
		return this.getToken(IsnowParser.BANG, 0);
	}

	spec() {
		return this.getTypedRuleContext(SpecContext, 0);
	}

	enterRule(listener) {
		if (listener instanceof IsnowParserListener) {
			listener.enterExclusion(this);
		}
	}

	exitRule(listener) {
		if (listener instanceof IsnowParserListener) {
			listener.exitExclusion(this);
		}
	}

	accept(visitor) {
		if (visitor instanceof IsnowParserVisitor) {
			return visitor.visitExclusion(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}

class SpecContext extends antlr4.ParserRuleContext {
	constructor(parser, parent, invokingState) {
		if (parent === undefined) {
			parent = null;
		}
		if (invokingState === undefined || invokingState === null) {
			invokingState = -1;
		}
		super(parent, invokingState);
		this.parser = parser;
		this.ruleIndex = IsnowParser.RULE_spec;
	}

	group = function (i) {
		if (i === undefined) {
			i = null;
		}
		if (i === null) {
			return this.getTypedRuleContexts(GroupContext);
		} else {
			return this.getTypedRuleContext(GroupContext, i);
		}
	};

	GSEP = function (i) {
		if (i === undefined) {
			i = null;
		}
		if (i === null) {
			return this.getTokens(IsnowParser.GSEP);
		} else {
			return this.getToken(IsnowParser.GSEP, i);
		}
	};

	enterRule(listener) {
		if (listener instanceof IsnowParserListener) {
			listener.enterSpec(this);
		}
	}

	exitRule(listener) {
		if (listener instanceof IsnowParserListener) {
			listener.exitSpec(this);
		}
	}

	accept(visitor) {
		if (visitor instanceof IsnowParserVisitor) {
			return visitor.visitSpec(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}

class GroupContext extends antlr4.ParserRuleContext {
	constructor(parser, parent, invokingState) {
		if (parent === undefined) {
			parent = null;
		}
		if (invokingState === undefined || invokingState === null) {
			invokingState = -1;
		}
		super(parent, invokingState);
		this.parser = parser;
		this.ruleIndex = IsnowParser.RULE_group;
	}

	dateGroup() {
		return this.getTypedRuleContext(DateGroupContext, 0);
	}

	timeGroup() {
		return this.getTypedRuleContext(TimeGroupContext, 0);
	}

	bareGroup() {
		return this.getTypedRuleContext(BareGroupContext, 0);
	}

	enterRule(listener) {
		if (listener instanceof IsnowParserListener) {
			listener.enterGroup(this);
		}
	}

	exitRule(listener) {
		if (listener instanceof IsnowParserListener) {
			listener.exitGroup(this);
		}
	}

	accept(visitor) {
		if (visitor instanceof IsnowParserVisitor) {
			return visitor.visitGroup(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}

class DateGroupContext extends antlr4.ParserRuleContext {
	constructor(parser, parent, invokingState) {
		if (parent === undefined) {
			parent = null;
		}
		if (invokingState === undefined || invokingState === null) {
			invokingState = -1;
		}
		super(parent, invokingState);
		this.parser = parser;
		this.ruleIndex = IsnowParser.RULE_dateGroup;
	}

	field = function (i) {
		if (i === undefined) {
			i = null;
		}
		if (i === null) {
			return this.getTypedRuleContexts(FieldContext);
		} else {
			return this.getTypedRuleContext(FieldContext, i);
		}
	};

	SLASH = function (i) {
		if (i === undefined) {
			i = null;
		}
		if (i === null) {
			return this.getTokens(IsnowParser.SLASH);
		} else {
			return this.getToken(IsnowParser.SLASH, i);
		}
	};

	enterRule(listener) {
		if (listener instanceof IsnowParserListener) {
			listener.enterDateGroup(this);
		}
	}

	exitRule(listener) {
		if (listener instanceof IsnowParserListener) {
			listener.exitDateGroup(this);
		}
	}

	accept(visitor) {
		if (visitor instanceof IsnowParserVisitor) {
			return visitor.visitDateGroup(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}

class TimeGroupContext extends antlr4.ParserRuleContext {
	constructor(parser, parent, invokingState) {
		if (parent === undefined) {
			parent = null;
		}
		if (invokingState === undefined || invokingState === null) {
			invokingState = -1;
		}
		super(parent, invokingState);
		this.parser = parser;
		this.ruleIndex = IsnowParser.RULE_timeGroup;
	}

	field = function (i) {
		if (i === undefined) {
			i = null;
		}
		if (i === null) {
			return this.getTypedRuleContexts(FieldContext);
		} else {
			return this.getTypedRuleContext(FieldContext, i);
		}
	};

	COLON = function (i) {
		if (i === undefined) {
			i = null;
		}
		if (i === null) {
			return this.getTokens(IsnowParser.COLON);
		} else {
			return this.getToken(IsnowParser.COLON, i);
		}
	};

	enterRule(listener) {
		if (listener instanceof IsnowParserListener) {
			listener.enterTimeGroup(this);
		}
	}

	exitRule(listener) {
		if (listener instanceof IsnowParserListener) {
			listener.exitTimeGroup(this);
		}
	}

	accept(visitor) {
		if (visitor instanceof IsnowParserVisitor) {
			return visitor.visitTimeGroup(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}

class BareGroupContext extends antlr4.ParserRuleContext {
	constructor(parser, parent, invokingState) {
		if (parent === undefined) {
			parent = null;
		}
		if (invokingState === undefined || invokingState === null) {
			invokingState = -1;
		}
		super(parent, invokingState);
		this.parser = parser;
		this.ruleIndex = IsnowParser.RULE_bareGroup;
	}

	field() {
		return this.getTypedRuleContext(FieldContext, 0);
	}

	enterRule(listener) {
		if (listener instanceof IsnowParserListener) {
			listener.enterBareGroup(this);
		}
	}

	exitRule(listener) {
		if (listener instanceof IsnowParserListener) {
			listener.exitBareGroup(this);
		}
	}

	accept(visitor) {
		if (visitor instanceof IsnowParserVisitor) {
			return visitor.visitBareGroup(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}

class FieldContext extends antlr4.ParserRuleContext {
	constructor(parser, parent, invokingState) {
		if (parent === undefined) {
			parent = null;
		}
		if (invokingState === undefined || invokingState === null) {
			invokingState = -1;
		}
		super(parent, invokingState);
		this.parser = parser;
		this.ruleIndex = IsnowParser.RULE_field;
	}

	term = function (i) {
		if (i === undefined) {
			i = null;
		}
		if (i === null) {
			return this.getTypedRuleContexts(TermContext);
		} else {
			return this.getTypedRuleContext(TermContext, i);
		}
	};

	BANG() {
		return this.getToken(IsnowParser.BANG, 0);
	}

	COMMA = function (i) {
		if (i === undefined) {
			i = null;
		}
		if (i === null) {
			return this.getTokens(IsnowParser.COMMA);
		} else {
			return this.getToken(IsnowParser.COMMA, i);
		}
	};

	enterRule(listener) {
		if (listener instanceof IsnowParserListener) {
			listener.enterField(this);
		}
	}

	exitRule(listener) {
		if (listener instanceof IsnowParserListener) {
			listener.exitField(this);
		}
	}

	accept(visitor) {
		if (visitor instanceof IsnowParserVisitor) {
			return visitor.visitField(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}

class TermContext extends antlr4.ParserRuleContext {
	constructor(parser, parent, invokingState) {
		if (parent === undefined) {
			parent = null;
		}
		if (invokingState === undefined || invokingState === null) {
			invokingState = -1;
		}
		super(parent, invokingState);
		this.parser = parser;
		this.ruleIndex = IsnowParser.RULE_term;
	}

	atom = function (i) {
		if (i === undefined) {
			i = null;
		}
		if (i === null) {
			return this.getTypedRuleContexts(AtomContext);
		} else {
			return this.getTypedRuleContext(AtomContext, i);
		}
	};

	DASH = function (i) {
		if (i === undefined) {
			i = null;
		}
		if (i === null) {
			return this.getTokens(IsnowParser.DASH);
		} else {
			return this.getToken(IsnowParser.DASH, i);
		}
	};

	incr() {
		return this.getTypedRuleContext(IncrContext, 0);
	}

	enterRule(listener) {
		if (listener instanceof IsnowParserListener) {
			listener.enterTerm(this);
		}
	}

	exitRule(listener) {
		if (listener instanceof IsnowParserListener) {
			listener.exitTerm(this);
		}
	}

	accept(visitor) {
		if (visitor instanceof IsnowParserVisitor) {
			return visitor.visitTerm(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}

class IncrContext extends antlr4.ParserRuleContext {
	constructor(parser, parent, invokingState) {
		if (parent === undefined) {
			parent = null;
		}
		if (invokingState === undefined || invokingState === null) {
			invokingState = -1;
		}
		super(parent, invokingState);
		this.parser = parser;
		this.ruleIndex = IsnowParser.RULE_incr;
	}

	PLUS() {
		return this.getToken(IsnowParser.PLUS, 0);
	}

	LBRACK() {
		return this.getToken(IsnowParser.LBRACK, 0);
	}

	qty = function (i) {
		if (i === undefined) {
			i = null;
		}
		if (i === null) {
			return this.getTypedRuleContexts(QtyContext);
		} else {
			return this.getTypedRuleContext(QtyContext, i);
		}
	};

	RBRACK() {
		return this.getToken(IsnowParser.RBRACK, 0);
	}

	COMMA = function (i) {
		if (i === undefined) {
			i = null;
		}
		if (i === null) {
			return this.getTokens(IsnowParser.COMMA);
		} else {
			return this.getToken(IsnowParser.COMMA, i);
		}
	};

	DASH() {
		return this.getToken(IsnowParser.DASH, 0);
	}

	enterRule(listener) {
		if (listener instanceof IsnowParserListener) {
			listener.enterIncr(this);
		}
	}

	exitRule(listener) {
		if (listener instanceof IsnowParserListener) {
			listener.exitIncr(this);
		}
	}

	accept(visitor) {
		if (visitor instanceof IsnowParserVisitor) {
			return visitor.visitIncr(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}

class AtomContext extends antlr4.ParserRuleContext {
	constructor(parser, parent, invokingState) {
		if (parent === undefined) {
			parent = null;
		}
		if (invokingState === undefined || invokingState === null) {
			invokingState = -1;
		}
		super(parent, invokingState);
		this.parser = parser;
		this.ruleIndex = IsnowParser.RULE_atom;
	}

	STAR() {
		return this.getToken(IsnowParser.STAR, 0);
	}

	NAME() {
		return this.getToken(IsnowParser.NAME, 0);
	}

	qty = function (i) {
		if (i === undefined) {
			i = null;
		}
		if (i === null) {
			return this.getTypedRuleContexts(QtyContext);
		} else {
			return this.getTypedRuleContext(QtyContext, i);
		}
	};

	enterRule(listener) {
		if (listener instanceof IsnowParserListener) {
			listener.enterAtom(this);
		}
	}

	exitRule(listener) {
		if (listener instanceof IsnowParserListener) {
			listener.exitAtom(this);
		}
	}

	accept(visitor) {
		if (visitor instanceof IsnowParserVisitor) {
			return visitor.visitAtom(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}

class QtyContext extends antlr4.ParserRuleContext {
	constructor(parser, parent, invokingState) {
		if (parent === undefined) {
			parent = null;
		}
		if (invokingState === undefined || invokingState === null) {
			invokingState = -1;
		}
		super(parent, invokingState);
		this.parser = parser;
		this.ruleIndex = IsnowParser.RULE_qty;
	}

	NUMBER() {
		return this.getToken(IsnowParser.NUMBER, 0);
	}

	NAME() {
		return this.getToken(IsnowParser.NAME, 0);
	}

	enterRule(listener) {
		if (listener instanceof IsnowParserListener) {
			listener.enterQty(this);
		}
	}

	exitRule(listener) {
		if (listener instanceof IsnowParserListener) {
			listener.exitQty(this);
		}
	}

	accept(visitor) {
		if (visitor instanceof IsnowParserVisitor) {
			return visitor.visitQty(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}

IsnowParser.PatternContext = PatternContext;
IsnowParser.BoundContext = BoundContext;
IsnowParser.BoundOpContext = BoundOpContext;
IsnowParser.ExclusionContext = ExclusionContext;
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
