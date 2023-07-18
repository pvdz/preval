# Preval test case

# auto_ident_cond_complex_c-seq_simple.md

> Normalize > Expressions > Assignments > For let > Auto ident cond complex c-seq simple
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
for (let xyz = (a = $(1) ? (40, 50, $(60)) : $($(100))); ; $(1)) $(xyz);
$(a);
`````

## Pre Normal

`````js filename=intro
let a = { a: 999, b: 1000 };
{
  let xyz = (a = $(1) ? (40, 50, $(60)) : $($(100)));
  while (true) {
    $(xyz);
    $(1);
  }
}
$(a);
`````

## Normalized

`````js filename=intro
let a = { a: 999, b: 1000 };
const tmpIfTest = $(1);
if (tmpIfTest) {
  a = $(60);
} else {
  const tmpCallCallee = $;
  const tmpCalleeParam = $(100);
  a = tmpCallCallee(tmpCalleeParam);
}
let xyz = a;
while (true) {
  $(xyz);
  $(1);
}
$(a);
`````

## Output

`````js filename=intro
let a = { a: 999, b: 1000 };
const tmpIfTest = $(1);
let xyz = undefined;
if (tmpIfTest) {
  a = $(60);
  xyz = a;
  $(xyz);
} else {
  const tmpCalleeParam = $(100);
  a = $(tmpCalleeParam);
  xyz = a;
  $(xyz);
}
$(1);
$(xyz);
$(1);
$(xyz);
$(1);
$(xyz);
$(1);
$(xyz);
$(1);
$(xyz);
$(1);
$(xyz);
$(1);
$(xyz);
$(1);
$(xyz);
$(1);
$(xyz);
$(1);
$(xyz);
$(1);
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  $(xyz);
  $(1);
}
$(a);
`````

## PST Output

With rename=true

`````js filename=intro
let a = {
a: 999,
b: 1000
;
const b = $( 1 );
let c = undefined;
if (b) {
  a = $( 60 );
  c = a;
  $( c );
}
else {
  const d = $( 100 );
  a = $( d );
  c = a;
  $( c );
}
$( 1 );
$( c );
$( 1 );
$( c );
$( 1 );
$( c );
$( 1 );
$( c );
$( 1 );
$( c );
$( 1 );
$( c );
$( 1 );
$( c );
$( 1 );
$( c );
$( 1 );
$( c );
$( 1 );
$( c );
$( 1 );
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  $( c );
  $( 1 );
}
$( a );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 1
 - 2: 60
 - 3: 60
 - 4: 1
 - 5: 60
 - 6: 1
 - 7: 60
 - 8: 1
 - 9: 60
 - 10: 1
 - 11: 60
 - 12: 1
 - 13: 60
 - 14: 1
 - 15: 60
 - 16: 1
 - 17: 60
 - 18: 1
 - 19: 60
 - 20: 1
 - 21: 60
 - 22: 1
 - 23: 60
 - 24: 1
 - 25: 60
 - 26: 1
 - eval returned: ('<crash[ Loop aborted by Preval test runner (this simply curbs infinite loops in tests) ]>')

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
