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
    {
      {
        let ifTestTmp = $(1);
        if (ifTestTmp) {
          break a;
        } else {
          break b;
        }
      }
    }
  }
}
`````

## Output

`````js filename=intro
a: {
  b: {
    {
      {
        let ifTestTmp = $(1);
        if (ifTestTmp) {
          break a;
        } else {
          break b;
        }
      }
    }
  }
}
`````

## Result

Should call `$` with:
 - 0: 1
 - 1: undefined

Normalized calls: Same

Final output calls: Same
