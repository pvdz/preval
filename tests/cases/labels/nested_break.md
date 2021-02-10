# Preval test case

# nested.md

> labels > nested
>
> Labels should not throw

#TODO

## Input

`````js filename=intro
a: b: c: {
  if ($(1)) break a;
  else break b;
}
`````

## Normalized

`````js filename=intro
a: {
  b: {
    c: {
      const tmpIfTest = $(1);
      if (tmpIfTest) {
        break a;
      } else {
        break b;
      }
    }
  }
}
`````

## Output

`````js filename=intro
'<skipped>';
`````

## Result

Should call `$` with:
 - 1: 1
 - eval returned: undefined

Normalized calls: Same

Final output calls: BAD!!
 - eval returned: undefined
