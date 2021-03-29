# Preval test case

# auto_arguments_any.md

> Normalize > Expressions > Assignments > For let > Auto arguments any
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
for (let xyz = (a = arguments); ; $(1)) $(xyz);
$(a);
`````

## Pre Normal

`````js filename=intro
let a = { a: 999, b: 1000 };
{
  let xyz = (a = arguments);
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
a = arguments;
let xyz = a;
while (true) {
  $(xyz);
  $(1);
}
$(a);
`````

## Output

`````js filename=intro
const tmpSSA_a = arguments;
while (true) {
  $(tmpSSA_a);
  $(1);
}
$(tmpSSA_a);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: { 0: '"<$>"', 1: '"<function>"' }
 - 2: 1
 - 3: { 0: '"<$>"', 1: '"<function>"' }
 - 4: 1
 - 5: { 0: '"<$>"', 1: '"<function>"' }
 - 6: 1
 - 7: { 0: '"<$>"', 1: '"<function>"' }
 - 8: 1
 - 9: { 0: '"<$>"', 1: '"<function>"' }
 - 10: 1
 - 11: { 0: '"<$>"', 1: '"<function>"' }
 - 12: 1
 - 13: { 0: '"<$>"', 1: '"<function>"' }
 - 14: 1
 - 15: { 0: '"<$>"', 1: '"<function>"' }
 - 16: 1
 - 17: { 0: '"<$>"', 1: '"<function>"' }
 - 18: 1
 - 19: { 0: '"<$>"', 1: '"<function>"' }
 - 20: 1
 - 21: { 0: '"<$>"', 1: '"<function>"' }
 - 22: 1
 - 23: { 0: '"<$>"', 1: '"<function>"' }
 - 24: 1
 - 25: { 0: '"<$>"', 1: '"<function>"' }
 - 26: 1
 - eval returned: ('<crash[ Loop aborted by Preval test runner ]>')

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
