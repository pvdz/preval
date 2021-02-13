# Preval test case

# auto_ident_unary_simple.md

> normalize > expressions > assignments > for_let > auto_ident_unary_simple
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let x = 1;

let a = { a: 999, b: 1000 };
for (let xyz = (a = typeof x); ; $(1)) $(xyz);
$(a, x);
`````

## Normalized

`````js filename=intro
let x = 1;
let a = { a: 999, b: 1000 };
{
  a = typeof x;
  let xyz = a;
  while (true) {
    $(xyz);
    $(1);
  }
}
$(a, x);
`````

## Output

`````js filename=intro
let x = 1;
let a = { a: 999, b: 1000 };
{
  a = typeof x;
  let xyz = a;
  while (true) {
    $(xyz);
    $(1);
  }
}
$(a, x);
`````

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
 - eval returned: ('<crash[ Loop aborted by Preval test runner ]>')

Normalized calls: Same

Final output calls: Same