# Preval test case

# auto_ident_new_complex_complex_args.md

> Normalize > Expressions > Statement > Ternary c > Auto ident new complex complex args
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
let b = { $ };

let a = { a: 999, b: 1000 };
$(0) ? $(100) : new ($($))($(1), $(2));
$(a);
`````

## Pre Normal


`````js filename=intro
let b = { $: $ };
let a = { a: 999, b: 1000 };
$(0) ? $(100) : new ($($))($(1), $(2));
$(a);
`````

## Normalized


`````js filename=intro
let b = { $: $ };
let a = { a: 999, b: 1000 };
const tmpIfTest = $(0);
if (tmpIfTest) {
  $(100);
} else {
  const tmpNewCallee = $($);
  const tmpCalleeParam = $(1);
  const tmpCalleeParam$1 = $(2);
  new tmpNewCallee(tmpCalleeParam, tmpCalleeParam$1);
}
$(a);
`````

## Output


`````js filename=intro
const tmpIfTest = $(0);
if (tmpIfTest) {
  $(100);
} else {
  const tmpNewCallee = $($);
  const tmpCalleeParam = $(1);
  const tmpCalleeParam$1 = $(2);
  new tmpNewCallee(tmpCalleeParam, tmpCalleeParam$1);
}
const a = { a: 999, b: 1000 };
$(a);
`````

## PST Output

With rename=true

`````js filename=intro
const a = $( 0 );
if (a) {
  $( 100 );
}
else {
  const b = $( $ );
  const c = $( 1 );
  const d = $( 2 );
  new b( c, d );
}
const e = {
a: 999,
b: 1000
;
$( e );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 0
 - 2: '<$>'
 - 3: 1
 - 4: 2
 - 5: 1, 2
 - 6: { a: '999', b: '1000' }
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
