# Preval test case

# for_regular.md

> normalize > blocks > for_regular
>
> Add blocks to sub-statements

## Input

`````js filename=intro
for ($(1); $(2); $(3)) $(4);
`````

## Normalized

`````js filename=intro
{
  $(1);
  while (true) {
    const tmpIfTest = $(2);
    if (tmpIfTest) {
      $(4);
      $(3);
    } else {
      break;
    }
  }
}
`````

## Output

`````js filename=intro
$(1);
while (true) {
  const tmpIfTest = $(2);
  if (tmpIfTest) {
    $(4);
    $(3);
  } else {
    break;
  }
}
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 1
 - 2: 2
 - 3: 4
 - 4: 3
 - 5: 2
 - 6: 4
 - 7: 3
 - 8: 2
 - 9: 4
 - 10: 3
 - 11: 2
 - 12: 4
 - 13: 3
 - 14: 2
 - 15: 4
 - 16: 3
 - 17: 2
 - 18: 4
 - 19: 3
 - 20: 2
 - 21: 4
 - 22: 3
 - 23: 2
 - 24: 4
 - 25: 3
 - 26: 2
 - eval returned: ('<crash[ Loop aborted by Preval test runner ]>')

Normalized calls: Same

Final output calls: Same
