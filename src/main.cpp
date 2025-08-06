#include <iostream>
#include <SDL.h>

using namespace std;

int main(int argc, char* argv[]){   
    if( SDL_Init(SDL_INIT_EVERYTHING) < ){
        cerr << "SDL Error" << SDL_GetError() << endl;
    }
    

    cout << "Hello world!";


    return 0;
    //sfdaldladawda
}