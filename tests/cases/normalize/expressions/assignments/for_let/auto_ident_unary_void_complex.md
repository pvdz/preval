# Preval test case

# auto_ident_unary_void_complex.md

> normalize > expressions > assignments > for_let > auto_ident_unary_void_complex
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
for (let xyz = (a = void $(100)); ; $(1)) $(xyz);
$(a);
`````

## Normalized

`````js filename=intro
let a = { a: 999, b: 1000 };
{
  $(100);
  a = undefined;
  let xyz = a;
  while (true) {
    $(xyz);
    $(1);
  }
}
$(a);
`````

## Output

`````js filename=intro
let a = { a: 999, b: 1000 };
$(100);
a = undefined;
let xyz = a;
while (true) {
  $(xyz);
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

Normalized calls: Same

Final output calls: Same
