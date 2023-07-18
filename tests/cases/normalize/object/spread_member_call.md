# Preval test case

# spread_member_call.md

> Normalize > Object > Spread member call
>
> Spread arg that is simple should not change

#TODO

## Input

`````js filename=intro
const obj = {foo() { return $({ x: 1 }); }};
$({...obj.foo()});
`````

## Pre Normal

`````js filename=intro
const obj = {
  foo() {
    debugger;
    return $({ x: 1 });
  },
};
$({ ...obj.foo() });
`````

## Normalized

`````js filename=intro
const obj = {
  foo() {
    debugger;
    const tmpCallCallee = $;
    const tmpCalleeParam = { x: 1 };
    const tmpReturnArg = tmpCallCallee(tmpCalleeParam);
    return tmpReturnArg;
  },
};
const tmpCallCallee$1 = $;
const tmpObjSpread = obj.foo();
const tmpCalleeParam$1 = { ...tmpObjSpread };
tmpCallCallee$1(tmpCalleeParam$1);
`````

## Output

`````js filename=intro
const obj = {
  foo() {
    debugger;
    const tmpCalleeParam = { x: 1 };
    const tmpReturnArg = $(tmpCalleeParam);
    return tmpReturnArg;
  },
};
const tmpObjSpread = obj.foo();
const tmpCalleeParam$1 = { ...tmpObjSpread };
$(tmpCalleeParam$1);
`````

## PST Output

With rename=true

`````js filename=intro
const a = { foo(  ) {
  debugger;
  const b = { x: 1 };
  const c = $( b );
  return c;
}, };
const d = a.foo();
const e = { ... d };
$( e );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: { x: '1' }
 - 2: { x: '1' }
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
