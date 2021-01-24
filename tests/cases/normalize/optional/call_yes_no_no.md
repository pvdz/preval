# Preval test case

# call_yes_no_no.md

> normalize > optional > call_yes_no_no
>
> Mix optional with regular member call

#TODO

## Input

`````js filename=intro
function a() {
  const a = {
    a(){ return a; },
    b(){ return a; },
    c(){ return a; },
    d(){ return a; }
  };

  return a;
}
$(a?.().b().c().d);
`````

## Normalized

`````js filename=intro
function a() {
  const a_1 = {
    a() {
      return a_1;
    },
    b() {
      return a_1;
    },
    c() {
      return a_1;
    },
    d() {
      return a_1;
    },
  };
  return a_1;
}
var tmpArg;
var tmpOptionalChaining;
var tmpOptionalChaining$1;
var tmpOptionalChaining$2;
var tmpOptionalChaining$3;
var tmpOptionalChaining$4;
var tmpTernaryAlternate;
var tmpTernaryAlternate$1;
var tmpTernaryAlternate$2;
var tmpTernaryAlternate$3;
var tmpTernaryAlternate$4;
var tmpTernaryAlternate$5;
var tmpTernaryTest;
var tmpTernaryTest$1;
var tmpTernaryTest$2;
var tmpTernaryTest$3;
var tmpTernaryTest$4;
var tmpTernaryTest$5;
('<hoisted func decl `a`>');
tmpTernaryTest = a == null;
if (tmpTernaryTest) {
  tmpOptionalChaining$4 = undefined;
} else {
  tmpTernaryAlternate = a();
  tmpOptionalChaining$4 = tmpTernaryAlternate;
}
tmpTernaryTest$1 = tmpOptionalChaining$4 == null;
if (tmpTernaryTest$1) {
  tmpOptionalChaining$3 = undefined;
} else {
  tmpTernaryAlternate$1 = tmpOptionalChaining$4.b;
  tmpOptionalChaining$3 = tmpTernaryAlternate$1;
}
tmpTernaryTest$2 = tmpOptionalChaining$3 == null;
if (tmpTernaryTest$2) {
  tmpOptionalChaining$2 = undefined;
} else {
  tmpTernaryAlternate$2 = tmpOptionalChaining$3();
  tmpOptionalChaining$2 = tmpTernaryAlternate$2;
}
tmpTernaryTest$3 = tmpOptionalChaining$2 == null;
if (tmpTernaryTest$3) {
  tmpOptionalChaining$1 = undefined;
} else {
  tmpTernaryAlternate$3 = tmpOptionalChaining$2.c;
  tmpOptionalChaining$1 = tmpTernaryAlternate$3;
}
tmpTernaryTest$4 = tmpOptionalChaining$1 == null;
if (tmpTernaryTest$4) {
  tmpOptionalChaining = undefined;
} else {
  tmpTernaryAlternate$4 = tmpOptionalChaining$1();
  tmpOptionalChaining = tmpTernaryAlternate$4;
}
tmpTernaryTest$5 = tmpOptionalChaining == null;
if (tmpTernaryTest$5) {
  tmpArg = undefined;
} else {
  tmpTernaryAlternate$5 = tmpOptionalChaining.d;
  tmpArg = tmpTernaryAlternate$5;
}
$(tmpArg);
`````

## Output

`````js filename=intro
function a() {
  const a_1 = {
    a() {
      return a_1;
    },
    b() {
      return a_1;
    },
    c() {
      return a_1;
    },
    d() {
      return a_1;
    },
  };
  return a_1;
}
var tmpArg;
var tmpOptionalChaining;
var tmpOptionalChaining$1;
var tmpOptionalChaining$2;
var tmpOptionalChaining$3;
var tmpOptionalChaining$4;
var tmpTernaryAlternate;
var tmpTernaryAlternate$1;
var tmpTernaryAlternate$2;
var tmpTernaryAlternate$3;
var tmpTernaryAlternate$4;
var tmpTernaryAlternate$5;
var tmpTernaryTest;
var tmpTernaryTest$1;
var tmpTernaryTest$2;
var tmpTernaryTest$3;
var tmpTernaryTest$4;
var tmpTernaryTest$5;
tmpTernaryTest = a == null;
if (tmpTernaryTest) {
  tmpOptionalChaining$4 = undefined;
} else {
  tmpTernaryAlternate = a();
  tmpOptionalChaining$4 = tmpTernaryAlternate;
}
tmpTernaryTest$1 = tmpOptionalChaining$4 == null;
if (tmpTernaryTest$1) {
  tmpOptionalChaining$3 = undefined;
} else {
  tmpTernaryAlternate$1 = tmpOptionalChaining$4.b;
  tmpOptionalChaining$3 = tmpTernaryAlternate$1;
}
tmpTernaryTest$2 = tmpOptionalChaining$3 == null;
if (tmpTernaryTest$2) {
  tmpOptionalChaining$2 = undefined;
} else {
  tmpTernaryAlternate$2 = tmpOptionalChaining$3();
  tmpOptionalChaining$2 = tmpTernaryAlternate$2;
}
tmpTernaryTest$3 = tmpOptionalChaining$2 == null;
if (tmpTernaryTest$3) {
  tmpOptionalChaining$1 = undefined;
} else {
  tmpTernaryAlternate$3 = tmpOptionalChaining$2.c;
  tmpOptionalChaining$1 = tmpTernaryAlternate$3;
}
tmpTernaryTest$4 = tmpOptionalChaining$1 == null;
if (tmpTernaryTest$4) {
  tmpOptionalChaining = undefined;
} else {
  tmpTernaryAlternate$4 = tmpOptionalChaining$1();
  tmpOptionalChaining = tmpTernaryAlternate$4;
}
tmpTernaryTest$5 = tmpOptionalChaining == null;
if (tmpTernaryTest$5) {
  tmpArg = undefined;
} else {
  tmpTernaryAlternate$5 = tmpOptionalChaining.d;
  tmpArg = tmpTernaryAlternate$5;
}
$(tmpArg);
`````

## Result

Should call `$` with:
 - 0: null
 - 1: undefined

Normalized calls: Same

Final output calls: Same
