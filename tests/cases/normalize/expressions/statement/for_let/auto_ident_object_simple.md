# Preval test case

# auto_ident_object_simple.md

> normalize > expressions > statement > for_let > auto_ident_object_simple
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
for (let xyz = { x: 1, y: 2, z: 3 }; ; $(1)) $(xyz);
$(a);
`````

## Normalized

`````js filename=intro
let a = { a: 999, b: 1000 };
{
  let xyz = { x: 1, y: 2, z: 3 };
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
  let xyz = { x: 1, y: 2, z: 3 };
  while (true) {
    $(xyz);
    $(1);
  }
}
$(a);
`````

## Result

Should call `$` with:
 - 1: { x: '1', y: '2', z: '3' }
 - 2: 1
 - 3: { x: '1', y: '2', z: '3' }
 - 4: 1
 - 5: { x: '1', y: '2', z: '3' }
 - 6: 1
 - 7: { x: '1', y: '2', z: '3' }
 - 8: 1
 - 9: { x: '1', y: '2', z: '3' }
 - 10: 1
 - 11: { x: '1', y: '2', z: '3' }
 - 12: 1
 - 13: { x: '1', y: '2', z: '3' }
 - 14: 1
 - 15: { x: '1', y: '2', z: '3' }
 - 16: 1
 - 17: { x: '1', y: '2', z: '3' }
 - 18: 1
 - 19: { x: '1', y: '2', z: '3' }
 - 20: 1
 - 21: { x: '1', y: '2', z: '3' }
 - 22: 1
 - 23: { x: '1', y: '2', z: '3' }
 - 24: 1
 - 25: { x: '1', y: '2', z: '3' }
 - 26: 1
 - eval returned: ('<crash[ Loop aborted by Preval test runner ]>')

Normalized calls: Same

Final output calls: Same