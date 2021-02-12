# Preval test case

# auto_ident_upd_im_complex.md

> normalize > expressions > assignments > for_c > auto_ident_upd_im_complex
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let b = { x: 1 };

let a = { a: 999, b: 1000 };
for (; $(1); a = $($(b)).x--);
$(a, b);
`````

## Normalized

`````js filename=intro
let b = { x: 1 };
let a = { a: 999, b: 1000 };
{
  while (true) {
    const tmpIfTest = $(1);
    if (tmpIfTest) {
      const tmpCallCallee = $;
      const tmpCalleeParam = $(b);
      const tmpPostUpdArgObj = tmpCallCallee(tmpCalleeParam);
      const tmpPostUpdArgVal = tmpPostUpdArgObj.x;
      const tmpAssignMemLhsObj = tmpPostUpdArgObj;
      const tmpAssignMemRhs = tmpPostUpdArgVal - 1;
      tmpAssignMemLhsObj.x = tmpAssignMemRhs;
      a = tmpPostUpdArgVal;
    } else {
      break;
    }
  }
}
$(a, b);
`````

## Output

`````js filename=intro
let b = { x: 1 };
let a = { a: 999, b: 1000 };
{
  while (true) {
    const tmpIfTest = $(1);
    if (tmpIfTest) {
      const tmpCalleeParam = $(b);
      const tmpPostUpdArgObj = $(tmpCalleeParam);
      const tmpPostUpdArgVal = tmpPostUpdArgObj.x;
      const tmpAssignMemLhsObj = tmpPostUpdArgObj;
      const tmpAssignMemRhs = tmpPostUpdArgVal - 1;
      tmpAssignMemLhsObj.x = tmpAssignMemRhs;
      a = tmpPostUpdArgVal;
    } else {
      break;
    }
  }
}
$(a, b);
`````

## Result

Should call `$` with:
 - 1: 1
 - 2: { x: '1' }
 - 3: { x: '1' }
 - 4: 1
 - 5: { x: '0' }
 - 6: { x: '0' }
 - 7: 1
 - 8: { x: '-1' }
 - 9: { x: '-1' }
 - 10: 1
 - 11: { x: '-2' }
 - 12: { x: '-2' }
 - 13: 1
 - 14: { x: '-3' }
 - 15: { x: '-3' }
 - 16: 1
 - 17: { x: '-4' }
 - 18: { x: '-4' }
 - 19: 1
 - 20: { x: '-5' }
 - 21: { x: '-5' }
 - 22: 1
 - 23: { x: '-6' }
 - 24: { x: '-6' }
 - 25: 1
 - 26: { x: '-7' }
 - eval returned: ('<crash[ Loop aborted by Preval test runner ]>')

Normalized calls: Same

Final output calls: Same
