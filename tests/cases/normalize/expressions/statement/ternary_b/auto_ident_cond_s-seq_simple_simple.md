# Preval test case

# auto_ident_cond_s-seq_simple_simple.md

> Normalize > Expressions > Statement > Ternary b > Auto ident cond s-seq simple simple
>
> Normalization of all kinds of expressions should work the same no matter where they are

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
$(1) ? ((10, 20, 30) ? $(2) : $($(100))) : $(200);
$(a);
`````

## Pre Normal


`````js filename=intro
let a = { a: 999, b: 1000 };
$(1) ? ((10, 20, 30) ? $(2) : $($(100))) : $(200);
$(a);
`````

## Normalized


`````js filename=intro
let a = { a: 999, b: 1000 };
const tmpIfTest = $(1);
if (tmpIfTest) {
  const tmpIfTest$1 = 30;
  if (tmpIfTest$1) {
    $(2);
  } else {
    const tmpCallCallee = $;
    const tmpCalleeParam = $(100);
    tmpCallCallee(tmpCalleeParam);
  }
} else {
  $(200);
}
$(a);
`````

## Output


`````js filename=intro
const tmpIfTest /*:unknown*/ = $(1);
if (tmpIfTest) {
  $(2);
} else {
  $(200);
}
const a /*:object*/ = { a: 999, b: 1000 };
$(a);
`````

## PST Output

With rename=true

`````js filename=intro
const a = $( 1 );
if (a) {
  $( 2 );
}
else {
  $( 200 );
}
const b = {
  a: 999,
  b: 1000,
};
$( b );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 1
 - 2: 2
 - 3: { a: '999', b: '1000' }
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
