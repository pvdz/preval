# Preval test case

# auto_ident_delete_computed_simple_simple.md

> Normalize > Expressions > Statement > Logic or left > Auto ident delete computed simple simple
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
let arg = { y: 1 };

let a = { a: 999, b: 1000 };
delete arg["y"] || $(100);
$(a, arg);
`````

## Pre Normal


`````js filename=intro
let arg = { y: 1 };
let a = { a: 999, b: 1000 };
delete arg[`y`] || $(100);
$(a, arg);
`````

## Normalized


`````js filename=intro
let arg = { y: 1 };
let a = { a: 999, b: 1000 };
const tmpIfTest = delete arg.y;
if (tmpIfTest) {
} else {
  $(100);
}
$(a, arg);
`````

## Output


`````js filename=intro
const arg = { y: 1 };
const a = { a: 999, b: 1000 };
const tmpIfTest = delete arg.y;
if (tmpIfTest) {
} else {
  $(100);
}
$(a, arg);
`````

## PST Output

With rename=true

`````js filename=intro
const a = { y: 1 };
const b = {
a: 999,
b: 1000
;
const c = deletea.y;
if (c) {

}
else {
  $( 100 );
}
$( b, a );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: { a: '999', b: '1000' }, {}
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
