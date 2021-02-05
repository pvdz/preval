# Preval test case

# call_yes_yes_no.md

> normalize > optional > call_yes_yes_no
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
if (tmpChainRootCall) {
  const tmpChainElementCall = tmpChainRootCall();
  const tmpChainElementObject = tmpChainElementCall.b;
  if (tmpChainElementObject) {
    const tmpChainElementCall$1 = tmpChainElementObject.call(tmpChainElementCall);
    const tmpChainElementObject$1 = tmpChainElementCall$1.c;
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
const tmpCallCallee = $;
let tmpCalleeParam = undefined;
const tmpChainRootCall = a;
if (tmpChainRootCall) {
  const tmpChainElementCall = tmpChainRootCall();
  const tmpChainElementObject = tmpChainElementCall.b;
  if (tmpChainElementObject) {
    const tmpChainElementCall$1 = tmpChainElementObject.call(tmpChainElementCall);
    const tmpChainElementObject$1 = tmpChainElementCall$1.c;
    const tmpChainElementCall$2 = tmpChainElementObject$1.call(tmpChainElementCall$1);
    const tmpChainElementObject$2 = tmpChainElementCall$2.d;
    tmpCalleeParam = tmpChainElementObject$2;
  }
}
tmpCallCallee(tmpCalleeParam);
`````

## Result

Should call `$` with:
 - eval returned: ('<crash[ Cannot read property <ref> of <ref2> ]>')

Normalized calls: Same

Final output calls: Same
