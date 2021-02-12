# Preval test case

# call_no_yes_yes.md

> normalize > optional > call_no_yes_yes
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
$(a().b?.().c?.().d);
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
const tmpCallCallee = $;
let tmpCalleeParam = undefined;
const tmpChainRootCall = a;
const tmpChainElementCall = tmpChainRootCall();
const tmpChainElementObject = tmpChainElementCall.b;
if (tmpChainElementObject) {
  const tmpChainElementCall$1 = tmpChainElementObject.call(tmpChainElementCall);
  const tmpChainElementObject$1 = tmpChainElementCall$1.c;
  if (tmpChainElementObject$1) {
    const tmpChainElementCall$2 = tmpChainElementObject$1.call(tmpChainElementCall$1);
    const tmpChainElementObject$2 = tmpChainElementCall$2.d;
    tmpCalleeParam = tmpChainElementObject$2;
  }
}
tmpCallCallee(tmpCalleeParam);
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
let tmpCalleeParam = undefined;
const tmpChainRootCall = a;
const tmpChainElementCall = tmpChainRootCall();
const tmpChainElementObject = tmpChainElementCall.b;
if (tmpChainElementObject) {
  const tmpChainElementCall$1 = tmpChainElementObject.call(tmpChainElementCall);
  const tmpChainElementObject$1 = tmpChainElementCall$1.c;
  if (tmpChainElementObject$1) {
    const tmpChainElementCall$2 = tmpChainElementObject$1.call(tmpChainElementCall$1);
    const tmpChainElementObject$2 = tmpChainElementCall$2.d;
    tmpCalleeParam = tmpChainElementObject$2;
  }
}
$(tmpCalleeParam);
`````

## Result

Should call `$` with:
 - 1: 'function'
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
