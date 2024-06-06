# Preval test case

# auto_ident_logic_or_complex_simple.md

> Normalize > Expressions > Statement > Ternary a > Auto ident logic or complex simple
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
$($(0)) || 2 ? $(100) : $(200);
$(a);
`````

## Pre Normal


`````js filename=intro
let a = { a: 999, b: 1000 };
$($(0)) || 2 ? $(100) : $(200);
$(a);
`````

## Normalized


`````js filename=intro
let a = { a: 999, b: 1000 };
const tmpCallCallee = $;
const tmpCalleeParam = $(0);
let tmpIfTest = tmpCallCallee(tmpCalleeParam);
if (tmpIfTest) {
} else {
  tmpIfTest = 2;
}
if (tmpIfTest) {
  $(100);
} else {
  $(200);
}
$(a);
`````

## Output


`````js filename=intro
const tmpCalleeParam = $(0);
let tmpIfTest = $(tmpCalleeParam);
if (tmpIfTest) {
} else {
  tmpIfTest = true;
}
if (tmpIfTest) {
  $(100);
} else {
  $(200);
}
const a = { a: 999, b: 1000 };
$(a);
`````

## PST Output

With rename=true

`````js filename=intro
const a = $( 0 );
let b = $( a );
if (b) {

}
else {
  b = true;
}
if (b) {
  $( 100 );
}
else {
  $( 200 );
}
const c = {
a: 999,
b: 1000
;
$( c );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 0
 - 2: 0
 - 3: 100
 - 4: { a: '999', b: '1000' }
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
