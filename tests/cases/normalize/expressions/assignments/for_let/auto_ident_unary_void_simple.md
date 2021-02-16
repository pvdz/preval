# Preval test case

# auto_ident_unary_void_simple.md

> normalize > expressions > assignments > for_let > auto_ident_unary_void_simple
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let arg = 1;

let a = { a: 999, b: 1000 };
for (let xyz = (a = void arg); ; $(1)) $(xyz);
$(a, arg);
`````

## Normalized

`````js filename=intro
let arg = 1;
let a = { a: 999, b: 1000 };
{
  a = undefined;
  let xyz = a;
  while (true) {
    $(xyz);
    $(1);
  }
}
$(a, arg);
`````

## Output

`````js filename=intro
let a = { a: 999, b: 1000 };
a = undefined;
let xyz = a;
while (true) {
  $(xyz);
  $(1);
}
$(a, 1);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: undefined
 - 2: 1
 - 3: undefined
 - 4: 1
 - 5: undefined
 - 6: 1
 - 7: undefined
 - 8: 1
 - 9: undefined
 - 10: 1
 - 11: undefined
 - 12: 1
 - 13: undefined
 - 14: 1
 - 15: undefined
 - 16: 1
 - 17: undefined
 - 18: 1
 - 19: undefined
 - 20: 1
 - 21: undefined
 - 22: 1
 - 23: undefined
 - 24: 1
 - 25: undefined
 - 26: 1
 - eval returned: ('<crash[ Loop aborted by Preval test runner ]>')

Normalized calls: Same

Final output calls: Same
