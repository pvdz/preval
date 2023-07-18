# Preval test case

# auto_ident_regex.md

> Normalize > Expressions > Statement > For let > Auto ident regex
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
for (let xyz = /foo/; ; $(1)) $(xyz);
$(a);
`````

## Pre Normal

`````js filename=intro
let a = { a: 999, b: 1000 };
{
  let xyz = /foo/;
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
let xyz = /foo/;
while (true) {
  $(xyz);
  $(1);
}
$(a);
`````

## Output

`````js filename=intro
const xyz = /foo/;
$(xyz);
$(1);
const xyz$1 = /foo/;
$(xyz$1);
$(1);
const xyz$2 = /foo/;
$(xyz$2);
$(1);
const xyz$3 = /foo/;
$(xyz$3);
$(1);
const xyz$4 = /foo/;
$(xyz$4);
$(1);
const xyz$5 = /foo/;
$(xyz$5);
$(1);
const xyz$6 = /foo/;
$(xyz$6);
$(1);
const xyz$7 = /foo/;
$(xyz$7);
$(1);
const xyz$8 = /foo/;
$(xyz$8);
$(1);
const xyz$9 = /foo/;
$(xyz$9);
$(1);
const xyz$10 = /foo/;
$(xyz$10);
$(1);
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  const xyz$11 = /foo/;
  $(xyz$11);
  $(1);
}
const a = { a: 999, b: 1000 };
$(a);
`````

## PST Output

With rename=true

`````js filename=intro
const a = /foo/;
$( a );
$( 1 );
const b = /foo/;
$( b );
$( 1 );
const c = /foo/;
$( c );
$( 1 );
const d = /foo/;
$( d );
$( 1 );
const e = /foo/;
$( e );
$( 1 );
const f = /foo/;
$( f );
$( 1 );
const g = /foo/;
$( g );
$( 1 );
const h = /foo/;
$( h );
$( 1 );
const i = /foo/;
$( i );
$( 1 );
const j = /foo/;
$( j );
$( 1 );
const k = /foo/;
$( k );
$( 1 );
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  const l = /foo/;
  $( l );
  $( 1 );
}
const m = {
a: 999,
b: 1000
;
$( m );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: {}
 - 2: 1
 - 3: {}
 - 4: 1
 - 5: {}
 - 6: 1
 - 7: {}
 - 8: 1
 - 9: {}
 - 10: 1
 - 11: {}
 - 12: 1
 - 13: {}
 - 14: 1
 - 15: {}
 - 16: 1
 - 17: {}
 - 18: 1
 - 19: {}
 - 20: 1
 - 21: {}
 - 22: 1
 - 23: {}
 - 24: 1
 - 25: {}
 - 26: 1
 - eval returned: ('<crash[ Loop aborted by Preval test runner (this simply curbs infinite loops in tests) ]>')

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
