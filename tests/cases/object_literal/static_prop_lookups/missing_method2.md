# Preval test case

# missing_method2.md

> Object literal > Static prop lookups > Missing method2
>
> If we can statically resolve a property lookup, we should

## Input

`````js filename=intro
const o = {
  toString(){ return 'xyz'; },
};
$(o.toString());
`````

## Pre Normal


`````js filename=intro
const o = {
  toString() {
    debugger;
    return `xyz`;
  },
};
$(o.toString());
`````

## Normalized


`````js filename=intro
const o = {
  toString() {
    debugger;
    return `xyz`;
  },
};
const tmpCallCallee = $;
const tmpCalleeParam = o.toString();
tmpCallCallee(tmpCalleeParam);
`````

## Output


`````js filename=intro
const o /*:object*/ = {
  toString() {
    debugger;
    return `xyz`;
  },
};
const tmpCalleeParam /*:unknown*/ = o.toString();
$(tmpCalleeParam);
`````

## PST Output

With rename=true

`````js filename=intro
const a = { toString(  ) {
  debugger;
  return "xyz";
} };
const b = a.toString();
$( b );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 'xyz'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
