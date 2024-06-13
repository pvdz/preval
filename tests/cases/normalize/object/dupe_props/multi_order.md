# Preval test case

# multi_order.md

> Normalize > Object > Dupe props > Multi order
>
> Duplicate properties are legal but useless. We should get rid of them.

#TODO

## Input

`````js filename=intro
const x = {a: $('1'), a: $('2'), a: $('3'), a(){}};
$(x);
`````

## Pre Normal


`````js filename=intro
const x = {
  a: $(`1`),
  a: $(`2`),
  a: $(`3`),
  a() {
    debugger;
  },
};
$(x);
`````

## Normalized


`````js filename=intro
$(`1`);
$(`2`);
$(`3`);
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
$(`1`);
$(`2`);
$(`3`);
const x = {
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
$( "1" );
$( "2" );
$( "3" );
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
 - 1: '1'
 - 2: '2'
 - 3: '3'
 - 4: { a: '"<function>"' }
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
