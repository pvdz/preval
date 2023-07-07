# Preval test case

# auto_ident_unary_simple.md

> Normalize > Expressions > Statement > For let > Auto ident unary simple
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
let x = 1;

let a = { a: 999, b: 1000 };
for (let xyz = typeof x; ; $(1)) $(xyz);
$(a, x);
`````

## Pre Normal

`````js filename=intro
let x = 1;
let a = { a: 999, b: 1000 };
{
  let xyz = typeof x;
  while (true) {
    $(xyz);
    $(1);
  }
}
$(a, x);
`````

## Normalized

`````js filename=intro
let x = 1;
let a = { a: 999, b: 1000 };
let xyz = typeof x;
while (true) {
  $(xyz);
  $(1);
}
$(a, x);
`````

## Output

`````js filename=intro
$(`number`);
$(1);
$(`number`);
$(1);
$(`number`);
$(1);
$(`number`);
$(1);
$(`number`);
$(1);
$(`number`);
$(1);
$(`number`);
$(1);
$(`number`);
$(1);
$(`number`);
$(1);
$(`number`);
$(1);
$(`number`);
$(1);
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  $(`number`);
  $(1);
}
const a = { a: 999, b: 1000 };
$(a, 1);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 'number'
 - 2: 1
 - 3: 'number'
 - 4: 1
 - 5: 'number'
 - 6: 1
 - 7: 'number'
 - 8: 1
 - 9: 'number'
 - 10: 1
 - 11: 'number'
 - 12: 1
 - 13: 'number'
 - 14: 1
 - 15: 'number'
 - 16: 1
 - 17: 'number'
 - 18: 1
 - 19: 'number'
 - 20: 1
 - 21: 'number'
 - 22: 1
 - 23: 'number'
 - 24: 1
 - 25: 'number'
 - 26: 1
 - eval returned: ('<crash[ Loop aborted by Preval test runner (this simply curbs infinite loops in tests) ]>')

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
