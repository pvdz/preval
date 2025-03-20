# Preval test case

# nested.md

> Ref tracking > Done > Try-catch > Nested

## Options

- refTest

## Input

`````js filename=intro
let x = 1;
try {
  $(x);     // x=1
  x = 2;
  try {
    $(x);   // x=2
    x = 3;
    $(x);   // x=3
  } catch {
    $(x);   // x=2 3
    x = 4;
    $(x);   // x=4
  }
  x = 5;
} catch {
            // May observe x=3 if the first call in the inner catch throws
            // Can observe x=4 if the last call in the inner catch throws
  $(x);     // x=1 2 3 4 5
  x = 6;
}
$(x);       // x=5 6, anything else is a throw that does not reach here
`````


## Output

(Annotated with pids)

`````filename=intro
let x___4__ = 1;
try /*7*/ {
  $(x___11__);
  x___15__ = 2;
  try /*17*/ {
    $(x___21__);
    x___25__ = 3;
    $(x___29__);
  } catch (e___31__) /*32*/ {
    $(x___36__);
    x___40__ = 4;
    $(x___44__);
  }
  x___48__ = 5;
} catch (e$1___50__) /*51*/ {
  $(x___55__);
  x___59__ = 6;
}
$(x___63__);
`````


## Ref tracking result


               | reads      | read by     | overWrites     | overwritten by
x:
  - w @4       | ########## | 11,55       | none           | 15,59
  - r @11      | 4
  - w @15      | ########## | 21,36,55    | 4              | 25,40,59
  - r @21      | 15
  - w @25      | ########## | 29,36,55    | 15             | 40,48,59
  - r @29      | 25
  - r @36      | 15,25
  - w @40      | ########## | 44,55       | 15,25          | 48,59
  - r @44      | 40
  - w @48      | ########## | 55,63       | 25,40          | 59
  - r @55      | 4,15,25,40,48
  - w @59      | ########## | 63          | 4,15,25,40,48  | none
  - r @63      | 48,59
