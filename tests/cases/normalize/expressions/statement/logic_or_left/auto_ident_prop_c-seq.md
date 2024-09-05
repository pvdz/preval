# Preval test case

# auto_ident_prop_c-seq.md

> Normalize > Expressions > Statement > Logic or left > Auto ident prop c-seq
>
> Normalization of all kinds of expressions should work the same no matter where they are

## Input

`````js filename=intro
let b = { c: 1 };

let a = { a: 999, b: 1000 };
(1, 2, $(b)).c || $(100);
$(a, b);
`````

## Pre Normal


`````js filename=intro
let b = { c: 1 };
let a = { a: 999, b: 1000 };
(1, 2, $(b)).c || $(100);
$(a, b);
`````

## Normalized


`````js filename=intro
let b = { c: 1 };
let a = { a: 999, b: 1000 };
const tmpCompObj = $(b);
const tmpIfTest = tmpCompObj.c;
if (tmpIfTest) {
} else {
  $(100);
}
$(a, b);
`````

## Output


`````js filename=intro
const b = { c: 1 };
const tmpCompObj = $(b);
const tmpIfTest = tmpCompObj.c;
if (tmpIfTest) {
} else {
  $(100);
}
const a = { a: 999, b: 1000 };
$(a, b);
`````

## PST Output

With rename=true

`````js filename=intro
const a = { c: 1 };
const b = $( a );
const c = b.c;
if (c) {

}
else {
  $( 100 );
}
const d = {
  a: 999,
  b: 1000,
};
$( d, a );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: { c: '1' }
 - 2: { a: '999', b: '1000' }, { c: '1' }
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
