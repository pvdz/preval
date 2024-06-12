# Preval test case

# auto_ident_cond_c-seq_s-seq_simple.md

> Normalize > Expressions > Statement > For let > Auto ident cond c-seq s-seq simple
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
for (let xyz = (10, 20, $(30)) ? (40, 50, 60) : $($(100)); ; $(1)) $(xyz);
$(a);
`````

## Pre Normal


`````js filename=intro
let a = { a: 999, b: 1000 };
{
  let xyz = (10, 20, $(30)) ? (40, 50, 60) : $($(100));
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
let xyz = undefined;
const tmpIfTest = $(30);
if (tmpIfTest) {
  xyz = 60;
} else {
  const tmpCallCallee = $;
  const tmpCalleeParam = $(100);
  xyz = tmpCallCallee(tmpCalleeParam);
}
while (true) {
  $(xyz);
  $(1);
}
$(a);
`````

## Output


`````js filename=intro
let xyz = 60;
const tmpIfTest = $(30);
if (tmpIfTest) {
  $(60);
} else {
  const tmpCalleeParam = $(100);
  xyz = $(tmpCalleeParam);
  $(xyz);
}
$(1);
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  $(xyz);
  $(1);
}
throw `[preval] unreachable; infinite loop`;
`````

## PST Output

With rename=true

`````js filename=intro
let a = 60;
const b = $( 30 );
if (b) {
  $( 60 );
}
else {
  const c = $( 100 );
  a = $( c );
  $( a );
}
$( 1 );
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  $( a );
  $( 1 );
}
throw "[preval] unreachable; infinite loop";
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 30
 - 2: 60
 - 3: 1
 - 4: 60
 - 5: 1
 - 6: 60
 - 7: 1
 - 8: 60
 - 9: 1
 - 10: 60
 - 11: 1
 - 12: 60
 - 13: 1
 - 14: 60
 - 15: 1
 - 16: 60
 - 17: 1
 - 18: 60
 - 19: 1
 - 20: 60
 - 21: 1
 - 22: 60
 - 23: 1
 - 24: 60
 - 25: 1
 - 26: 60
 - eval returned: ('<crash[ Loop aborted by Preval test runner (this simply curbs infinite loops in tests) ]>')

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
