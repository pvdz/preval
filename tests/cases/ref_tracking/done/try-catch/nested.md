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
let /*___4__*/ x = 1;
try /*7~48*/ {
  $(/*___11__*/ x);
  /*___15__*/ x = 2;
  try /*17~29*/ {
    $(/*___21__*/ x);
    /*___25__*/ x = 3;
    $(/*___29__*/ x);
  } catch (/*___31__*/ e) /*32~44*/ {
    $(/*___36__*/ x);
    /*___40__*/ x = 4;
    $(/*___44__*/ x);
  }
  /*___48__*/ x = 5;
} catch (/*___50__*/ e$1) /*51~59*/ {
  $(/*___55__*/ x);
  /*___59__*/ x = 6;
}
$(/*___63__*/ x);
`````


## Todos triggered


None


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

e:
  - w @31      | ########## | not read    | none           | none

e$1:
  - w @50      | ########## | not read    | none           | none
