# Preval test case

# call_yes_no_no.md

> Normalize > Optional > Call yes no no
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
  const a$1 = {
    a() {
      return a$1;
    },
    b() {
      return a$1;
    },
    c() {
      return a$1;
    },
    d() {
      return a$1;
    },
  };
  return a$1;
}
const tmpCallCallee = $;
let tmpCalleeParam = undefined;
const tmpChainRootCall = a;
const tmpIfTest = tmpChainRootCall != null;
if (tmpIfTest) {
  const tmpChainElementCall = tmpChainRootCall();
  const tmpChainElementObject = tmpChainElementCall.b;
  const tmpChainElementCall$1 = tmpChainElementObject.call(tmpChainElementCall);
  const tmpChainElementObject$1 = tmpChainElementCall$1.c;
  const tmpChainElementCall$2 = tmpChainElementObject$1.call(tmpChainElementCall$1);
  const tmpChainElementObject$2 = tmpChainElementCall$2.d;
  tmpCalleeParam = tmpChainElementObject$2;
}
tmpCallCallee(tmpCalleeParam);
`````

## Output

`````js filename=intro
function a() {
  const a$1 = {
    a() {
      return a$1;
    },
    b() {
      return a$1;
    },
    c() {
      return a$1;
    },
    d() {
      return a$1;
    },
  };
  return a$1;
}
let tmpCalleeParam = undefined;
const tmpIfTest = a != null;
if (tmpIfTest) {
  const tmpChainElementCall = a();
  const tmpChainElementObject = tmpChainElementCall.b;
  const tmpChainElementCall$1 = tmpChainElementObject.call(tmpChainElementCall);
  const tmpChainElementObject$1 = tmpChainElementCall$1.c;
  const tmpChainElementCall$2 = tmpChainElementObject$1.call(tmpChainElementCall$1);
  const tmpChainElementObject$2 = tmpChainElementCall$2.d;
  tmpCalleeParam = tmpChainElementObject$2;
}
$(tmpCalleeParam);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: '<function>'
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
