# Preval test case

# spread_member_call.md

> normalize > array > spread_member_call
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
    return $({ x: 1 });
  },
};
const tmpCallCallee = $;
const tmpObjSpread = obj.foo();
const tmpCalleeParam = { ...tmpObjSpread };
tmpCallCallee(tmpCalleeParam);
`````

## Output

`````js filename=intro
'<skipped>';
`````

## Result

Should call `$` with:
 - 1: { x: '1' }
 - 2: { x: '1' }
 - eval returned: undefined

Normalized calls: Same

Final output calls: BAD!!
 - eval returned: undefined
