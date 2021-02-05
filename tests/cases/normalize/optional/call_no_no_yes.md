# Preval test case

# call_no_no_yes.md

> normalize > optional > call_no_no_yes
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
$(a().b().c?.().d);
`````

## Normalized

`````js filename=intro
function a() {
  const a = {
    a() {
      return a;
    },
    b() {
      return a;
    },
    c() {
      return a;
    },
    d() {
      return a;
    },
  };
  return a;
}
const tmpCallCallee = $;
let tmpCalleeParam = undefined;
const tmpChainRootCall = a;
const tmpChainElementCall = tmpChainRootCall();
const tmpChainElementObject = tmpChainElementCall.b;
const tmpChainElementCall$1 = tmpChainElementObject.call(tmpChainElementCall);
const tmpChainElementObject$1 = tmpChainElementCall$1.c;
if (tmpChainElementObject$1) {
  const tmpChainElementCall$2 = tmpChainElementObject$1.call(tmpChainElementCall$1);
  const tmpChainElementObject$2 = tmpChainElementCall$2.d;
  tmpCalleeParam = tmpChainElementObject$2;
}
tmpCallCallee(tmpCalleeParam);
`````

## Output

`````js filename=intro
function a() {
  const a = {
    a() {
      return a;
    },
    b() {
      return a;
    },
    c() {
      return a;
    },
    d() {
      return a;
    },
  };
  return a;
}
const tmpCallCallee = $;
let tmpCalleeParam = undefined;
const tmpChainRootCall = a;
const tmpChainElementCall = tmpChainRootCall();
const tmpChainElementObject = tmpChainElementCall.b;
const tmpChainElementCall$1 = tmpChainElementObject.call(tmpChainElementCall);
const tmpChainElementObject$1 = tmpChainElementCall$1.c;
if (tmpChainElementObject$1) {
  const tmpChainElementCall$2 = tmpChainElementObject$1.call(tmpChainElementCall$1);
  const tmpChainElementObject$2 = tmpChainElementCall$2.d;
  tmpCalleeParam = tmpChainElementObject$2;
}
tmpCallCallee(tmpCalleeParam);
`````

## Result

Should call `$` with:
 - eval returned: ('<crash[ Cannot read property <ref> of <ref2> ]>')

Normalized calls: Same

Final output calls: Same
