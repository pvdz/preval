# Preval test case

# auto_ident_func_anon.md

> normalize > expressions > statement > for_let > auto_ident_func_anon
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
for (let xyz = function () {}; ; $(1)) $(xyz);
$(a);
`````

## Normalized

`````js filename=intro
let a = { a: 999, b: 1000 };
{
  let xyz = function () {};
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
{
  let xyz = function () {};
  while (true) {
    $(xyz);
    $(1);
  }
}
$(a);
`````

## Result

Should call `$` with:
 - 1: 'function'
 - 2: 1
 - 3: 'function'
 - 4: 1
 - 5: 'function'
 - 6: 1
 - 7: 'function'
 - 8: 1
 - 9: 'function'
 - 10: 1
 - 11: 'function'
 - 12: 1
 - 13: 'function'
 - 14: 1
 - 15: 'function'
 - 16: 1
 - 17: 'function'
 - 18: 1
 - 19: 'function'
 - 20: 1
 - 21: 'function'
 - 22: 1
 - 23: 'function'
 - 24: 1
 - 25: 'function'
 - 26: 1
 - eval returned: ('<crash[ Loop aborted by Preval test runner ]>')

Normalized calls: Same

Final output calls: Same
