# Preval test case

# auto_ident_complex.md

> Normalize > Expressions > Statement > Logic or both > Auto ident complex
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
let b = 1;

let a = { a: 999, b: 1000 };
$(b) || $(b);
$(a, b);
`````

## Pre Normal


`````js filename=intro
let b = 1;
let a = { a: 999, b: 1000 };
$(b) || $(b);
$(a, b);
`````

## Normalized


`````js filename=intro
let b = 1;
let a = { a: 999, b: 1000 };
const tmpIfTest = $(b);
if (tmpIfTest) {
} else {
  $(b);
}
$(a, b);
`````

## Output


`````js filename=intro
const tmpIfTest = $(1);
if (tmpIfTest) {
} else {
  $(1);
}
const a = { a: 999, b: 1000 };
$(a, 1);
`````

## PST Output

With rename=true

`````js filename=intro
const a = $( 1 );
if (a) {

}
else {
  $( 1 );
}
const b = {
  a: 999,
  b: 1000,
};
$( b, 1 );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 1
 - 2: { a: '999', b: '1000' }, 1
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
