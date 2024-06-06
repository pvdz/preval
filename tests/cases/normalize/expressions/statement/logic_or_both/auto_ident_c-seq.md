# Preval test case

# auto_ident_c-seq.md

> Normalize > Expressions > Statement > Logic or both > Auto ident c-seq
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
let x = 1;

let a = { a: 999, b: 1000 };
($(1), $(2), $(x)) || ($(1), $(2), $(x));
$(a, x);
`````

## Pre Normal


`````js filename=intro
let x = 1;
let a = { a: 999, b: 1000 };
($(1), $(2), $(x)) || ($(1), $(2), $(x));
$(a, x);
`````

## Normalized


`````js filename=intro
let x = 1;
let a = { a: 999, b: 1000 };
$(1);
$(2);
const tmpIfTest = $(x);
if (tmpIfTest) {
} else {
  $(1);
  $(2);
  $(x);
}
$(a, x);
`````

## Output


`````js filename=intro
$(1);
$(2);
const tmpIfTest = $(1);
if (tmpIfTest) {
} else {
  $(1);
  $(2);
  $(1);
}
const a = { a: 999, b: 1000 };
$(a, 1);
`````

## PST Output

With rename=true

`````js filename=intro
$( 1 );
$( 2 );
const a = $( 1 );
if (a) {

}
else {
  $( 1 );
  $( 2 );
  $( 1 );
}
const b = {
a: 999,
b: 1000
;
$( b, 1 );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 1
 - 2: 2
 - 3: 1
 - 4: { a: '999', b: '1000' }, 1
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
