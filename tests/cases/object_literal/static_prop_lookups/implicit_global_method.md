# Preval test case

# implicit_global_method.md

> Object literal > Static prop lookups > Implicit global method
>
> If we can statically resolve a property lookup, we should

#TODO

## Input

`````js filename=intro
const o = {
  // Cannot inline this because we don't know if the implicit global cares about `this`
  f: $,
};
$(o.f("200", 15));
`````

## Pre Normal

`````js filename=intro
const o = { f: $ };
$(o.f(`200`, 15));
`````

## Normalized

`````js filename=intro
const o = { f: $ };
const tmpCallCallee = $;
const tmpCalleeParam = o.f(`200`, 15);
tmpCallCallee(tmpCalleeParam);
`````

## Output

`````js filename=intro
const o = { f: $ };
const tmpCalleeParam = o.f(`200`, 15);
$(tmpCalleeParam);
`````

## PST Output

With rename=true

`````js filename=intro
const a = { f: $ };
const b = a.f( "200", 15 );
$( b );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: '200', 15
 - 2: '200'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
