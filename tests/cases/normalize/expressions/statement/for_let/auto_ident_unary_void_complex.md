# Preval test case

# auto_ident_unary_void_complex.md

> Normalize > Expressions > Statement > For let > Auto ident unary void complex
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
for (let xyz = void $(100); ; $(1)) $(xyz);
$(a);
`````

## Pre Normal

`````js filename=intro
let a = { a: 999, b: 1000 };
{
  let xyz = void $(100);
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
$(100);
let xyz = undefined;
while (true) {
  $(xyz);
  $(1);
}
$(a);
`````

## Output

`````js filename=intro
const a = { a: 999, b: 1000 };
$(100);
while (true) {
  $(undefined);
  $(1);
}
$(a);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 100
 - 2: undefined
 - 3: 1
 - 4: undefined
 - 5: 1
 - 6: undefined
 - 7: 1
 - 8: undefined
 - 9: 1
 - 10: undefined
 - 11: 1
 - 12: undefined
 - 13: 1
 - 14: undefined
 - 15: 1
 - 16: undefined
 - 17: 1
 - 18: undefined
 - 19: 1
 - 20: undefined
 - 21: 1
 - 22: undefined
 - 23: 1
 - 24: undefined
 - 25: 1
 - 26: undefined
 - eval returned: ('<crash[ Loop aborted by Preval test runner ]>')

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
