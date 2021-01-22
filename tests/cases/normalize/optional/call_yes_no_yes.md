# Preval test case

# call_yes_no_yes.md

> normalize > optional > call_yes_no_yes
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
$(a?.().b().c?.().d);
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
var tmpOptionalChaining_1;
var tmpOptionalChaining_2;
var tmpOptionalChaining_3;
var tmpOptionalChaining_4;
var tmpTernaryTest;
var tmpTernaryAlternate;
var tmpTernaryTest_1;
var tmpTernaryAlternate_1;
var tmpTernaryTest_2;
var tmpTernaryAlternate_2;
var tmpTernaryTest_3;
var tmpTernaryAlternate_3;
var tmpTernaryTest_4;
var tmpTernaryAlternate_4;
var tmpTernaryTest_5;
var tmpTernaryAlternate_5;
tmpTernaryTest = a == null;
if (tmpTernaryTest) {
  tmpOptionalChaining_4 = undefined;
} else {
  tmpTernaryAlternate = a();
  tmpOptionalChaining_4 = tmpTernaryAlternate;
}
tmpTernaryTest_1 = tmpOptionalChaining_4 == null;
if (tmpTernaryTest_1) {
  tmpOptionalChaining_3 = undefined;
} else {
  tmpTernaryAlternate_1 = tmpOptionalChaining_4.b;
  tmpOptionalChaining_3 = tmpTernaryAlternate_1;
}
tmpTernaryTest_2 = tmpOptionalChaining_3 == null;
if (tmpTernaryTest_2) {
  tmpOptionalChaining_2 = undefined;
} else {
  tmpTernaryAlternate_2 = tmpOptionalChaining_3();
  tmpOptionalChaining_2 = tmpTernaryAlternate_2;
}
tmpTernaryTest_3 = tmpOptionalChaining_2 == null;
if (tmpTernaryTest_3) {
  tmpOptionalChaining_1 = undefined;
} else {
  tmpTernaryAlternate_3 = tmpOptionalChaining_2.c;
  tmpOptionalChaining_1 = tmpTernaryAlternate_3;
}
tmpTernaryTest_4 = tmpOptionalChaining_1 == null;
if (tmpTernaryTest_4) {
  tmpOptionalChaining = undefined;
} else {
  tmpTernaryAlternate_4 = tmpOptionalChaining_1();
  tmpOptionalChaining = tmpTernaryAlternate_4;
}
tmpTernaryTest_5 = tmpOptionalChaining == null;
if (tmpTernaryTest_5) {
  tmpArg = undefined;
} else {
  tmpTernaryAlternate_5 = tmpOptionalChaining.d;
  tmpArg = tmpTernaryAlternate_5;
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
var tmpOptionalChaining_1;
var tmpOptionalChaining_2;
var tmpOptionalChaining_3;
var tmpOptionalChaining_4;
var tmpTernaryTest;
var tmpTernaryAlternate;
var tmpTernaryTest_1;
var tmpTernaryAlternate_1;
var tmpTernaryTest_2;
var tmpTernaryAlternate_2;
var tmpTernaryTest_3;
var tmpTernaryAlternate_3;
var tmpTernaryTest_4;
var tmpTernaryAlternate_4;
var tmpTernaryTest_5;
var tmpTernaryAlternate_5;
tmpTernaryTest = a == null;
if (tmpTernaryTest) {
  tmpOptionalChaining_4 = undefined;
} else {
  tmpTernaryAlternate = a();
  tmpOptionalChaining_4 = tmpTernaryAlternate;
}
tmpTernaryTest_1 = tmpOptionalChaining_4 == null;
if (tmpTernaryTest_1) {
  tmpOptionalChaining_3 = undefined;
} else {
  tmpTernaryAlternate_1 = tmpOptionalChaining_4.b;
  tmpOptionalChaining_3 = tmpTernaryAlternate_1;
}
tmpTernaryTest_2 = tmpOptionalChaining_3 == null;
if (tmpTernaryTest_2) {
  tmpOptionalChaining_2 = undefined;
} else {
  tmpTernaryAlternate_2 = tmpOptionalChaining_3();
  tmpOptionalChaining_2 = tmpTernaryAlternate_2;
}
tmpTernaryTest_3 = tmpOptionalChaining_2 == null;
if (tmpTernaryTest_3) {
  tmpOptionalChaining_1 = undefined;
} else {
  tmpTernaryAlternate_3 = tmpOptionalChaining_2.c;
  tmpOptionalChaining_1 = tmpTernaryAlternate_3;
}
tmpTernaryTest_4 = tmpOptionalChaining_1 == null;
if (tmpTernaryTest_4) {
  tmpOptionalChaining = undefined;
} else {
  tmpTernaryAlternate_4 = tmpOptionalChaining_1();
  tmpOptionalChaining = tmpTernaryAlternate_4;
}
tmpTernaryTest_5 = tmpOptionalChaining == null;
if (tmpTernaryTest_5) {
  tmpArg = undefined;
} else {
  tmpTernaryAlternate_5 = tmpOptionalChaining.d;
  tmpArg = tmpTernaryAlternate_5;
}
$(tmpArg);
`````

## Result

Should call `$` with:
 - 0: null
 - 1: undefined

Normalized calls: Same

Final output calls: Same
