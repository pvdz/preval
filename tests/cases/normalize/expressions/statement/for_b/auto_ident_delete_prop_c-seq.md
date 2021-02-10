# Preval test case

# auto_ident_delete_prop_c-seq.md

> normalize > expressions > statement > for_b > auto_ident_delete_prop_c-seq
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
let x = { y: 1 };

let a = { a: 999, b: 1000 };
for (; delete ($(1), $(2), $(x)).y; $(1));
$(a, x);
`````

## Normalized

`````js filename=intro
let x = { y: 1 };
let a = { a: 999, b: 1000 };
{
  while (true) {
    $(1);
    $(2);
    const tmpDeleteObj = $(x);
    const tmpIfTest = delete tmpDeleteObj.y;
    if (tmpIfTest) {
      $(1);
    } else {
      break;
    }
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
 - 3: { y: '1' }
 - 4: 1
 - 5: 1
 - 6: 2
 - 7: {}
 - 8: 1
 - 9: 1
 - 10: 2
 - 11: {}
 - 12: 1
 - 13: 1
 - 14: 2
 - 15: {}
 - 16: 1
 - 17: 1
 - 18: 2
 - 19: {}
 - 20: 1
 - 21: 1
 - 22: 2
 - 23: {}
 - 24: 1
 - 25: 1
 - 26: 2
 - eval returned: ('<crash[ Loop aborted by Preval test runner ]>')

Normalized calls: Same

Final output calls: BAD!!
 - eval returned: undefined
