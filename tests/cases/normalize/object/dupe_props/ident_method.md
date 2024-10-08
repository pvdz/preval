# Preval test case

# ident_method.md

> Normalize > Object > Dupe props > Ident method
>
> Duplicate properties are legal but useless. We should get rid of them.

## Input

`````js filename=intro
const x = {a: $('prop'), a(){}};
$(x);
`````

## Pre Normal


`````js filename=intro
const x = {
  a: $(`prop`),
  a() {
    debugger;
  },
};
$(x);
`````

## Normalized


`````js filename=intro
$(`prop`);
const x = {
  a() {
    debugger;
    return undefined;
  },
};
$(x);
`````

## Output


`````js filename=intro
$(`prop`);
const x /*:object*/ = {
  a() {
    debugger;
    return undefined;
  },
};
$(x);
`````

## PST Output

With rename=true

`````js filename=intro
$( "prop" );
const a = { a(  ) {
  debugger;
  return undefined;
} };
$( a );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 'prop'
 - 2: { a: '"<function>"' }
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
