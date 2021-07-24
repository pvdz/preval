# Preval test case

# call_yes_yes_no.md

> Normalize > Optional > Call yes yes no
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
$(a?.().b?.().c().d);
`````

## Pre Normal

`````js filename=intro
let a = function () {
  debugger;
  const a$1 = {
    a() {
      debugger;
      return a$1;
    },
    b() {
      debugger;
      return a$1;
    },
    c() {
      debugger;
      return a$1;
    },
    d() {
      debugger;
      return a$1;
    },
  };
  return a$1;
};
$(a?.().b?.().c().d);
`````

## Normalized

`````js filename=intro
let a = function () {
  debugger;
  const a$1 = {
    a() {
      debugger;
      return a$1;
    },
    b() {
      debugger;
      return a$1;
    },
    c() {
      debugger;
      return a$1;
    },
    d() {
      debugger;
      return a$1;
    },
  };
  return a$1;
};
const tmpCallCallee = $;
let tmpCalleeParam = undefined;
const tmpChainRootCall = a;
const tmpIfTest = tmpChainRootCall != null;
if (tmpIfTest) {
  const tmpChainElementCall = tmpChainRootCall();
  const tmpChainElementObject = tmpChainElementCall.b;
  const tmpIfTest$1 = tmpChainElementObject != null;
  if (tmpIfTest$1) {
    const tmpChainElementCall$1 = $dotCall(tmpChainElementObject, tmpChainElementCall);
    const tmpChainElementObject$1 = tmpChainElementCall$1.c;
    const tmpChainElementCall$3 = $dotCall(tmpChainElementObject$1, tmpChainElementCall$1);
    const tmpChainElementObject$3 = tmpChainElementCall$3.d;
    tmpCalleeParam = tmpChainElementObject$3;
  } else {
  }
} else {
}
tmpCallCallee(tmpCalleeParam);
`````

## Output

`````js filename=intro
const a$1 = {
  a() {
    debugger;
    return a$1;
  },
  b() {
    debugger;
    return a$1;
  },
  c() {
    debugger;
    return a$1;
  },
  d() {
    debugger;
    return a$1;
  },
};
const tmpChainElementObject = a$1.b;
const tmpIfTest$1 = tmpChainElementObject == null;
if (tmpIfTest$1) {
  $(undefined);
} else {
  const tmpChainElementCall$1 = $dotCall(tmpChainElementObject, a$1);
  const tmpChainElementObject$1 = tmpChainElementCall$1.c;
  const tmpChainElementCall$3 = $dotCall(tmpChainElementObject$1, tmpChainElementCall$1);
  const tmpChainElementObject$3 = tmpChainElementCall$3.d;
  $(tmpChainElementObject$3);
}
`````

## Globals

None

## Result

Should call `$` with:
 - 1: '<function>'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
