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

## Normalized

`````js filename=intro
const obj = {
  foo() {
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
    const tmpCalleeParam = { x: 1 };
    const tmpReturnArg = $(tmpCalleeParam);
    return tmpReturnArg;
  },
};
const tmpObjSpread = obj.foo();
const tmpCalleeParam$1 = { ...tmpObjSpread };
$(tmpCalleeParam$1);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: { x: '1' }
 - 2: { x: '1' }
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
