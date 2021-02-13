# Preval test case

# auto_pattern_obj_complex.md

> normalize > expressions > statement > for_b > auto_pattern_obj_complex
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
let { a } = { a: 999, b: 1000 };
for (; $({ a: 1, b: 2 }); $(1));
$(a);
`````

## Normalized

`````js filename=intro
let bindingPatternObjRoot = { a: 999, b: 1000 };
let a = bindingPatternObjRoot.a;
{
  while (true) {
    const tmpCallCallee = $;
    const tmpCalleeParam = { a: 1, b: 2 };
    const tmpIfTest = tmpCallCallee(tmpCalleeParam);
    if (tmpIfTest) {
      $(1);
    } else {
      break;
    }
  }
}
$(a);
`````

## Output

`````js filename=intro
let bindingPatternObjRoot = { a: 999, b: 1000 };
let a = bindingPatternObjRoot.a;
{
  while (true) {
    const tmpCalleeParam = { a: 1, b: 2 };
    const tmpIfTest = $(tmpCalleeParam);
    if (tmpIfTest) {
      $(1);
    } else {
      break;
    }
  }
}
$(a);
`````

## Result

Should call `$` with:
 - 1: { a: '1', b: '2' }
 - 2: 1
 - 3: { a: '1', b: '2' }
 - 4: 1
 - 5: { a: '1', b: '2' }
 - 6: 1
 - 7: { a: '1', b: '2' }
 - 8: 1
 - 9: { a: '1', b: '2' }
 - 10: 1
 - 11: { a: '1', b: '2' }
 - 12: 1
 - 13: { a: '1', b: '2' }
 - 14: 1
 - 15: { a: '1', b: '2' }
 - 16: 1
 - 17: { a: '1', b: '2' }
 - 18: 1
 - 19: { a: '1', b: '2' }
 - 20: 1
 - 21: { a: '1', b: '2' }
 - 22: 1
 - 23: { a: '1', b: '2' }
 - 24: 1
 - 25: { a: '1', b: '2' }
 - 26: 1
 - eval returned: ('<crash[ Loop aborted by Preval test runner ]>')

Normalized calls: Same

Final output calls: Same