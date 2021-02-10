# Preval test case

# auto_ident_delete_prop_s-seq.md

> normalize > expressions > statement > for_let > auto_ident_delete_prop_s-seq
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
let x = { y: 1 };

let a = { a: 999, b: 1000 };
for (let xyz = delete ($(1), $(2), x).y; ; $(1)) $(xyz);
$(a, x);
`````

## Normalized

`````js filename=intro
let x = { y: 1 };
let a = { a: 999, b: 1000 };
{
  $(1);
  $(2);
  const tmpDeleteObj = x;
  let xyz = delete tmpDeleteObj.y;
  while (true) {
    $(xyz);
    $(1);
  }
}
$(a, x);
`````

## Output

`````js filename=intro
'<skipped>';
`````

## Result

Should call `$` with:
 - 1: 1
 - 2: 2
 - 3: true
 - 4: 1
 - 5: true
 - 6: 1
 - 7: true
 - 8: 1
 - 9: true
 - 10: 1
 - 11: true
 - 12: 1
 - 13: true
 - 14: 1
 - 15: true
 - 16: 1
 - 17: true
 - 18: 1
 - 19: true
 - 20: 1
 - 21: true
 - 22: 1
 - 23: true
 - 24: 1
 - 25: true
 - 26: 1
 - eval returned: ('<crash[ Loop aborted by Preval test runner ]>')

Normalized calls: Same

Final output calls: BAD!!
 - eval returned: undefined
