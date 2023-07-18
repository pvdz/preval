# Preval test case

# auto_ident_upd_ip_complex.md

> Normalize > Expressions > Statement > For let > Auto ident upd ip complex
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
let b = { x: 1 };

let a = { a: 999, b: 1000 };
for (let xyz = $($(b)).x++; ; $(1)) $(xyz);
$(a, b);
`````

## Pre Normal

`````js filename=intro
let b = { x: 1 };
let a = { a: 999, b: 1000 };
{
  let xyz = $($(b)).x++;
  while (true) {
    $(xyz);
    $(1);
  }
}
$(a, b);
`````

## Normalized

`````js filename=intro
let b = { x: 1 };
let a = { a: 999, b: 1000 };
const tmpCallCallee = $;
const tmpCalleeParam = $(b);
const tmpPostUpdArgObj = tmpCallCallee(tmpCalleeParam);
const tmpPostUpdArgVal = tmpPostUpdArgObj.x;
const tmpAssignMemLhsObj = tmpPostUpdArgObj;
const tmpAssignMemRhs = tmpPostUpdArgVal + 1;
tmpAssignMemLhsObj.x = tmpAssignMemRhs;
let xyz = tmpPostUpdArgVal;
while (true) {
  $(xyz);
  $(1);
}
$(a, b);
`````

## Output

`````js filename=intro
const b = { x: 1 };
const a = { a: 999, b: 1000 };
const tmpCalleeParam = $(b);
const tmpPostUpdArgObj = $(tmpCalleeParam);
const tmpPostUpdArgVal = tmpPostUpdArgObj.x;
const tmpAssignMemRhs = tmpPostUpdArgVal + 1;
tmpPostUpdArgObj.x = tmpAssignMemRhs;
$(tmpPostUpdArgVal);
$(1);
$(tmpPostUpdArgVal);
$(1);
$(tmpPostUpdArgVal);
$(1);
$(tmpPostUpdArgVal);
$(1);
$(tmpPostUpdArgVal);
$(1);
$(tmpPostUpdArgVal);
$(1);
$(tmpPostUpdArgVal);
$(1);
$(tmpPostUpdArgVal);
$(1);
$(tmpPostUpdArgVal);
$(1);
$(tmpPostUpdArgVal);
$(1);
$(tmpPostUpdArgVal);
$(1);
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  $(tmpPostUpdArgVal);
  $(1);
}
$(a, b);
`````

## PST Output

With rename=true

`````js filename=intro
const a = { x: 1 };
const b = {
a: 999,
b: 1000
;
const c = $( a );
const d = $( c );
const e = d.x;
const f = e + 1;
d.x = f;
$( e );
$( 1 );
$( e );
$( 1 );
$( e );
$( 1 );
$( e );
$( 1 );
$( e );
$( 1 );
$( e );
$( 1 );
$( e );
$( 1 );
$( e );
$( 1 );
$( e );
$( 1 );
$( e );
$( 1 );
$( e );
$( 1 );
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  $( e );
  $( 1 );
}
$( b, a );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: { x: '1' }
 - 2: { x: '1' }
 - 3: 1
 - 4: 1
 - 5: 1
 - 6: 1
 - 7: 1
 - 8: 1
 - 9: 1
 - 10: 1
 - 11: 1
 - 12: 1
 - 13: 1
 - 14: 1
 - 15: 1
 - 16: 1
 - 17: 1
 - 18: 1
 - 19: 1
 - 20: 1
 - 21: 1
 - 22: 1
 - 23: 1
 - 24: 1
 - 25: 1
 - 26: 1
 - eval returned: ('<crash[ Loop aborted by Preval test runner (this simply curbs infinite loops in tests) ]>')

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
