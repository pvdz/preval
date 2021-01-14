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

## Uniformed

`````js filename=intro
x: {
  x: {
    {
      {
        var x = x(8);
        if (x) {
          break x;
        } else {
          break x;
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
