# Preval test case

# auto_ident_func_anon.md

> Normalize > Expressions > Assignments > For let > Auto ident func anon
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
for (let xyz = (a = function () {}); ; $(1)) $(xyz);
$(a);
`````

## Pre Normal

`````js filename=intro
let a = { a: 999, b: 1000 };
{
  let xyz = (a = function () {});
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
a = function () {};
let xyz = a;
while (true) {
  $(xyz);
  $(1);
}
$(a);
`````

## Output

`````js filename=intro
const SSA_a = function () {};
while (true) {
  $(SSA_a);
  $(1);
}
$(SSA_a);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: '<function>'
 - 2: 1
 - 3: '<function>'
 - 4: 1
 - 5: '<function>'
 - 6: 1
 - 7: '<function>'
 - 8: 1
 - 9: '<function>'
 - 10: 1
 - 11: '<function>'
 - 12: 1
 - 13: '<function>'
 - 14: 1
 - 15: '<function>'
 - 16: 1
 - 17: '<function>'
 - 18: 1
 - 19: '<function>'
 - 20: 1
 - 21: '<function>'
 - 22: 1
 - 23: '<function>'
 - 24: 1
 - 25: '<function>'
 - 26: 1
 - eval returned: ('<crash[ Loop aborted by Preval test runner ]>')

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
