# Preval test case

# auto_ident_func_anon.md

> Normalize > Expressions > Statement > Ternary b > Auto ident func anon
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
$(1) ? function () {} : $(200);
$(a);
`````

## Pre Normal


`````js filename=intro
let a = { a: 999, b: 1000 };
$(1)
  ? function () {
      debugger;
    }
  : $(200);
$(a);
`````

## Normalized


`````js filename=intro
let a = { a: 999, b: 1000 };
const tmpIfTest = $(1);
if (tmpIfTest) {
} else {
  $(200);
}
$(a);
`````

## Output


`````js filename=intro
const tmpIfTest = $(1);
if (tmpIfTest) {
} else {
  $(200);
}
const a = { a: 999, b: 1000 };
$(a);
`````

## PST Output

With rename=true

`````js filename=intro
const a = $( 1 );
if (a) {

}
else {
  $( 200 );
}
const b = {
a: 999,
b: 1000
;
$( b );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 1
 - 2: { a: '999', b: '1000' }
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
