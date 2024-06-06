# Preval test case

# auto_ident_call_ident_complex_args.md

> Normalize > Expressions > Statement > Ternary a > Auto ident call ident complex args
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
let b = { $ };

let a = { a: 999, b: 1000 };
$($(1), $(2)) ? $(100) : $(200);
$(a);
`````

## Pre Normal


`````js filename=intro
let b = { $: $ };
let a = { a: 999, b: 1000 };
$($(1), $(2)) ? $(100) : $(200);
$(a);
`````

## Normalized


`````js filename=intro
let b = { $: $ };
let a = { a: 999, b: 1000 };
const tmpCallCallee = $;
const tmpCalleeParam = $(1);
const tmpCalleeParam$1 = $(2);
const tmpIfTest = tmpCallCallee(tmpCalleeParam, tmpCalleeParam$1);
if (tmpIfTest) {
  $(100);
} else {
  $(200);
}
$(a);
`````

## Output


`````js filename=intro
const tmpCalleeParam = $(1);
const tmpCalleeParam$1 = $(2);
const tmpIfTest = $(tmpCalleeParam, tmpCalleeParam$1);
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
const a = $( 1 );
const b = $( 2 );
const c = $( a, b );
if (c) {
  $( 100 );
}
else {
  $( 200 );
}
const d = {
a: 999,
b: 1000
;
$( d );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 1
 - 2: 2
 - 3: 1, 2
 - 4: 100
 - 5: { a: '999', b: '1000' }
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
